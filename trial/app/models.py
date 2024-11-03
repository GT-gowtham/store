from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User as auth_user
import datetime

# User Details Table

class User_details(models.Model):
    user_ID = models.ForeignKey(auth_user, on_delete=models.CASCADE)
    user_name = models.CharField(max_length=100)
    user_address = models.CharField(max_length=100)
    user_city = models.CharField(max_length=100)
    user_country = models.CharField(max_length=100)
    user_state = models.CharField(max_length=100)
    user_pincode = models.CharField(max_length=100)
    user_phone = models.CharField(max_length=100)  
    user_checkboxes = models.BooleanField(default=False)
    user_created_date = models.DateField(auto_now_add=True)
    user_update_date = models.DateField(auto_now_add=True)  

    def __str__(self):
        return self.user_name
    
    
# Product Table
class Product(models.Model):
    product_name = models.CharField(max_length=150, null=False, blank=False)
    product_price = models.DecimalField(max_digits=10, decimal_places=2, null=False, blank=False)   
    product_stock = models.IntegerField(null=False, blank=False, default=0)
    product_qty = models.CharField(max_length=150, null=False, blank=False)
    product_image = models.ImageField(upload_to='uploads/images', null=False, blank=False)
    product_description = models.TextField(null=False, blank=False)
    product_category = models.CharField(max_length=150, null=False, blank=False, default="product")
    product_created_at = models.DateTimeField(auto_now_add=True)
    product_updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.product_name

# Order Table
class Order(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(auth_user, on_delete=models.CASCADE)  # Reference to user
    product = models.ForeignKey(Product, on_delete=models.CASCADE)  # Reference to product
    quantity = models.IntegerField()
    total_price = models.DecimalField(max_digits=10, decimal_places=2)  # Order Price
    payment_method = models.CharField(max_length=50)  # Payment Method
    user_address = models.ForeignKey(User_details, on_delete=models.CASCADE)  # User Address
    status = models.CharField(max_length=10, default='PENDING')  # Order Status
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)
    payment_status = models.CharField(max_length=50, choices=[
        ('Pending', 'Pending'),
        ('Completed', 'Completed'),
        ('Failed', 'Failed')
    ])
    delivery_status = models.CharField(max_length=50, choices=[
        ('Processing', 'Processing'),
        ('Shipped', 'Shipped'),
        ('Delivered', 'Delivered'),
        ('Canceled', 'Canceled')
    ])

    def __str__(self):
        return f"Order {self.id} by {self.user}"

# Payment Table
class Payment(models.Model):
    payment_id = models.AutoField(primary_key=True)
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_method = models.CharField(max_length=50, choices=[
        ('Credit Card', 'Credit Card'),
        ('PayPal', 'PayPal'),
        ('Cash on Delivery', 'Cash on Delivery')
    ])
    payment_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Payment {self.payment_id} for Order {self.order.id}"

# Wishlist Table
class Wishlist(models.Model):
    wishlist_id = models.ForeignKey(auth_user, on_delete=models.CASCADE)
    wishlist_product_id = models.ForeignKey(Product, on_delete=models.CASCADE)
    wishlist_created_date = models.DateField(auto_now_add=True)
    wishlist_update_date = models.DateField(auto_now=True)  # Corrected to auto_now

    def __str__(self):
        return str(self.wishlist_id)

# Add to Cart Table
class AddToCart(models.Model):
    cart_id = models.ForeignKey(auth_user, on_delete=models.CASCADE)
    cart_product_id = models.ForeignKey(Product, on_delete=models.CASCADE)
    # cart_total_price = models.DecimalField(max_digits=10, decimal_places=2, null=False, blank=False)
    # cart_total_quantity = models.IntegerField(null=False, blank=False)
    cart_created_at = models.DateTimeField(auto_now_add=True)
    cart_updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.cart_id)

# Contact Us Table
class Contact(models.Model):
    contact_name = models.CharField(max_length=255)
    contact_email = models.EmailField()
    contact_message = models.TextField()
    contact_created_date = models.DateTimeField(auto_now_add=True)
    contact_updated_date = models.DateTimeField(auto_now=True) 

    def __str__(self):
        return self.contact_name

class PendingUser(models.Model):
    email = models.EmailField(unique=True)
    otp = models.CharField(max_length=6)
    is_verified = models.BooleanField(default=False)
    otp_expiration = models.DateTimeField(default=timezone.now() + timezone.timedelta(minutes=5))