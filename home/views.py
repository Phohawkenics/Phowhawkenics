from django.shortcuts import render
from django.http import HttpResponse


# def index(request):
#     return HttpResponse("Hello, world. You're at the polls index.")
def index(request):
	return render(request, 'base.html', {})

def about(request):
	contentId = request.GET.get('contentId', '')

	if contentId == "1":
		contentName = "whoAmI"
	elif contentId == "2":
		contentName = "experiences"
	else:
		contentName = "whoAmI"

	context = {
		"contentName": contentName
	}
	return render(request, 'about.html', context)

def services(request):
	contentId = request.GET.get('contentId', '')

	if contentId == "1":
		contentName = "websites"
	elif contentId == "2":
		contentName = "web-applications"
	else:
		contentName = "websites"

	context = {
		"contentName": contentName
	}
	return render(request, 'services.html', context)

def portfolio(request):
	contentId = request.GET.get('contentId', '')

	if contentId == "1":
		contentName = "phohawkenics"
	else:
		contentName = "phohawkenics"

	context = {
		"contentName": contentName
	}
	
	return render(request, 'portfolio.html', context)
