from django.conf.urls import url

from . import views

urlpatterns = [
	url(r'^$', views.index, name='index'),
    url(r'^home/$', views.index, name='index'),
    url(r'^about/$', views.about, name='about'),
    url(r'^services/$', views.services, name='services'),
    url(r'^portfolio/$', views.portfolio, name='portfolio'),
    url(r'^articles/$', views.articles, name='articles'),
]