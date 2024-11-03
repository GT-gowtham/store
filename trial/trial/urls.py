from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from app.views import UserView
from app import views


from app.views import ProductView, CartView, OrderView, User_detailsView, PaymentView, WishlistView, ContactView, CheckSessionView, UserView, OTPView, CheckEmailView, login_view, logout_view 

from rest_framework import routers

# Define different routes for each viewset
user_router = routers.DefaultRouter()
user_router.register("users", UserView, basename='users')

product_router = routers.DefaultRouter()
product_router.register("products", ProductView, basename='products')

cart_router = routers.DefaultRouter()
cart_router.register("cart", CartView, basename='cart')

Order_router = routers.DefaultRouter()
Order_router.register("Order", OrderView, basename='Order')

User_details_router = routers.DefaultRouter()
User_details_router.register("User_details", User_detailsView, basename='User_details')

Payment_router = routers.DefaultRouter()
Payment_router.register("Payment", PaymentView, basename='Payment')

Wishlist_router = routers.DefaultRouter()
Wishlist_router.register("Wishlist", WishlistView, basename='Wishlist')

Contact_router = routers.DefaultRouter()
Contact_router.register("Contact", ContactView, basename='Contact')


otp_router = routers.DefaultRouter()
otp_router.register(r'otp', OTPView, basename='otp')


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/register/', UserView.as_view({'post': 'create'}), name='register-user'),
    path('api/login/', login_view, name='login'),
    path("api/logout/", logout_view, name="logout"),
    path('api/check-session/', CheckSessionView.as_view(), name='check_session'),
    path('api/product/', include(product_router.urls)),  # Route for products  
    path('api/search/', views.search_products, name='search_products'),  
    path('api/', include(cart_router.urls)),     # Route for cart
    path('api/order/', include(Order_router.urls)),     # Route for cart
    path('api/', include(User_details_router.urls)),     # Route for cart
    path('api/', include(Payment_router.urls)),     # Route for cart
    path('api/wishlist/', include(Wishlist_router.urls)),     # Route for cart
    path('api/', include(Contact_router.urls)),     # Route for cart
    path('api/', include(otp_router.urls)),
    path('api/verify-otp/', OTPView.as_view({'post': 'verify'}), name='verify-otp'),
     path('api/check-email/', CheckEmailView.as_view(), name='check_email'),

] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT) +  static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)