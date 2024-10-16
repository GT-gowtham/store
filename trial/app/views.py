from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from .models import Product, AddToCart, Order, User_details, Payment, Wishlist, Contact
from .serializers import ProductSerializer, CartSerializer, OrderSerializer, User_detailsSerializer, PaymentSerializer, WishlistSerializer, ContactSerializer, UserSerializer
from rest_framework import viewsets
from django.core.mail import send_mail


# Create your views here.
class UserView(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        
        if user is not None:
            login(request, user)  # Create session
            return Response({'message': 'Login successful'}, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

class ProductView(viewsets.ModelViewSet):
    queryset = Product .objects.all()
    serializer_class = ProductSerializer

class CartView(viewsets.ModelViewSet):
    queryset = AddToCart .objects.all()
    serializer_class = CartSerializer

class OrderView(viewsets.ModelViewSet):
    queryset = Order .objects.all()
    serializer_class = OrderSerializer    

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