import random
from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from .models import Product, AddToCart, Order, User_details, Payment, Wishlist, Contact, PendingUser
from .serializers import ProductSerializer, CartSerializer, OrderSerializer, User_detailsSerializer, PaymentSerializer, WishlistSerializer, ContactSerializer, UserSerializer, PendingUserSerializer, CheckEmailSerializer
from rest_framework import viewsets
from django.core.mail import send_mail
from django.shortcuts import get_object_or_404
from django.utils import timezone
from rest_framework.views import APIView
from django.contrib.sessions.models import Session
from django.http import JsonResponse
# from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from rest_framework.permissions import AllowAny
from django.contrib.auth import logout
from django.db.models import Q


# Create your views here.
class UserView(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

@api_view(['POST'])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')

    # Authenticate user
    user = authenticate(request, username=username, password=password)

    if user is not None:
        # Log the user in
        login(request, user)

        # Create or retrieve the session key
        session_key = request.session.session_key
        if not session_key:
            request.session.create()
            session_key = request.session.session_key

        # Return the session key in the response
        return Response({"message": "Login successful!", "session_key": session_key}, status=status.HTTP_200_OK)
    else:
        # Debugging: Print the username and the password status
        print(f'Failed login attempt for username: {username}')
        return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)
        
def check_email(request):
    email = request.query_params.get('email')
    exists = User.objects.filter(email=email).exists()
    return Response({'exists': exists})

class ProductView(viewsets.ModelViewSet):
    queryset = Product .objects.all()
    serializer_class = ProductSerializer

class CartView(viewsets.ModelViewSet):
    queryset = AddToCart .objects.all()
    serializer_class = CartSerializer

class OrderView(viewsets.ModelViewSet):
    queryset = Order .objects.all()
    serializer_class = OrderSerializer    

# class OrderUpdateView(APIView):
#     def put(self, request, pk):
#         try:
#             order = Order.objects.get(pk=pk)
#             serializer = OrderSerializer(order, data=request.data, partial=True)  # Enable partial updates
#             if serializer.is_valid():
#                 serializer.save()
#                 return Response(serializer.data, status=status.HTTP_200_OK)
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#         except Order.DoesNotExist:
#             return Response({"error": "Order not found"}, status=status.HTTP_404_NOT_FOUND)   

class User_detailsView(viewsets.ModelViewSet):
    queryset = User_details .objects.all()      
    serializer_class = User_detailsSerializer

class WishlistView(viewsets.ModelViewSet):
    queryset = Wishlist .objects.all()
    serializer_class = WishlistSerializer

class PaymentView(viewsets.ModelViewSet):
    queryset = Payment .objects.all()
    serializer_class = PaymentSerializer

class ContactView(viewsets.ModelViewSet):
    serializer_class = ContactSerializer
    queryset = Contact.objects.all()

    def create(self, request, *args, **kwargs):
        # Call the default create method to save the contact data
        response = super().create(request, *args, **kwargs)

        # Retrieve contact information from the request data
        contact_name = request.data.get('contact_name')
        contact_email = request.data.get('contact_email')
        contact_message = request.data.get('contact_message')

        try:
            # Send confirmation email to the user
            send_mail(
                subject='Thank you for contacting us!',
                message=f"Hi {contact_name},\n\nThank you for reaching out. We have received your message:\n\n\nWe will get back to you shortly.",
                from_email='gtgowtham6@gmail.com',
                recipient_list=[contact_email],
                fail_silently=False,
            )

            # Send notification email to admin
            send_mail(
                subject='New Contact Message',
                message=f"New message from {contact_name} ({contact_email}):\n\n{contact_message}",
                from_email='gtgowtham6@gmail.com',
                recipient_list=['gtgowtham6@gmail.com'],  # Admin email
                fail_silently=False,
            )

            return Response({"message": "Contact created and email sent successfully"}, status=201)

        except Exception as e:
            # Handle email sending errors
            return Response({"error": f"Error sending email: {str(e)}"}, status=500)       
        
def generate_otp():
    return str(random.randint(100000, 999999))

class OTPView(viewsets.ViewSet):

    def create(self, request):
        email = request.data.get('email')
        otp = generate_otp()
        pending_user, created = PendingUser.objects.update_or_create(
            email=email,
            defaults={'otp': otp, 'is_verified': False, 'otp_expiration': timezone.now() + timezone.timedelta(minutes=5)},
        )

        send_mail(
            subject='Your OTP for verification',
            message=f'Your OTP is: {otp}',
            from_email='your_email@example.com',
            recipient_list=[email],
            fail_silently=False,
        )

        return Response({'message': 'OTP sent to email'}, status=status.HTTP_201_CREATED)

    def verify(self, request):
        email = request.data.get('email')
        otp = request.data.get('otp')

        try:
            pending_user = get_object_or_404(PendingUser, email=email, otp=otp)

            if timezone.now() > pending_user.otp_expiration:
                return Response({'message': 'OTP expired'}, status=status.HTTP_400_BAD_REQUEST)

            pending_user.is_verified = True
            pending_user.save()

            return Response({'message': 'OTP verified', 'status': 'success'}, status=status.HTTP_200_OK)
        except:
            return Response({'message': 'Invalid OTP', 'status': 'error'}, status=status.HTTP_400_BAD_REQUEST)

    def register(self, request):
        email = request.data.get('email')
        first_name = request.data.get('first_name')
        last_name = request.data.get('last_name')
        username = request.data.get('username')
        password = request.data.get('password')

        pending_user = get_object_or_404(PendingUser, email=email, is_verified=True)

        if pending_user:
            user_serializer = UserSerializer(data={
                'first_name': first_name,
                'last_name': last_name,
                'username': username,
                'email': email,
                'password': password,
            })
            if user_serializer.is_valid():
                user_serializer.save()
                return Response({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)
            return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response({'message': 'OTP not verified'}, status=status.HTTP_400_BAD_REQUEST)
    
class CheckEmailView(APIView):
    def post(self, request):  # POST method handler
        serializer = CheckEmailSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            if User.objects.filter(email=email).exists():  # Check if the email exists
                return Response({"message": "Email already exists."}, status=status.HTTP_200_OK)
            return Response({"message": "Email is available."}, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
@method_decorator(csrf_exempt, name='dispatch')
class CheckSessionView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        session_id = request.data.get('session_id')
        
        if session_id:
            try:
                session = Session.objects.get(pk=session_id)
                session_data = session.get_decoded()
                user_id = session_data.get('_auth_user_id')
                
                if user_id:
                    user = User.objects.get(pk=user_id)
                    return JsonResponse({"username": user.username,"name":user.first_name ,"user_id":user_id, "status": "active"}, status=status.HTTP_200_OK)
            except Session.DoesNotExist:
                pass
        
        return JsonResponse({"username": None, "status": "inactive"}, status=status.HTTP_404_NOT_FOUND)
@csrf_exempt    
def logout_view(request):
    logout(request)  # Clear the session in the database
    response = JsonResponse({"message": "Logged out successfully"})
    response.delete_cookie("sessionid")  # Ensure browser session is cleared
    return response

@api_view(['GET'])
def search_products(request):
    query = request.GET.get('query', '')
    if query:
        # Filter products based on the product name containing the query
        products = Product.objects.filter(product_name__icontains=query)
        # Serialize the data with context to get the full URL
        serializer = ProductSerializer(products, many=True, context={'request': request})
        return Response(serializer.data)
    return Response([])