from django.conf.urls import url

from . import views

urlpatterns = [
	url(r'^$', views.index, name='index'),
    url(r'^home/$', views.index, name='index'),
    url(r'^about/$', views.about, name='about'),
    url(r'^about/whoAmI$', views.whoAmI, name='whoAmI'),
    url(r'^about/myEducation$', views.myEducation, name='myEducation'),
]