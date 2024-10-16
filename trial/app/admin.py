from django.contrib import admin
from .models import Product, AddToCart, Order, User_details, Payment, Wishlist, Contact

admin.site.register(Product)
admin.site.register(AddToCart)
admin.site.register(Order)
admin.site.register(User_details)
admin.site.register(Payment)
admin.site.register(Wishlist)
admin.site.register(Contact)
