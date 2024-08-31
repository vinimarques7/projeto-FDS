from django.shortcuts import render

# Create your views here.
def index(request):
    return render(request, 'which_teacher_app/index.html')
