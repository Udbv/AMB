"""AMB URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.IndexView.as_view(), name='index'),
    # ex: /polls/5/
    url(r'^journal/$', views.JournalView.as_view(), name='journal'),
    url(r'^journal/(?P<pk>[0-9]+)/$', views.JournalDetail.as_view(), name='journal_detail'),
    url(r'^calls/$', views.Calls.as_view(), name='calls'),
    url(r'^calls/(?P<pk>[0-9]+)/$', views.CallsDetail.as_view(), name='call_detail'),
    url(r'^employees/$', views.EmployeesView.as_view(), name='employees'),
    url(r'^employees/(?P<pk>[0-9]+)/$', views.EmployeesDetailView.as_view(), name='detail_emp'),
    url(r'^ambulance/', views.Patient.as_view(), name='patient'),
    url(r'^ambulance/(?P<pk>[0-9]+)/$', views.DetailView.as_view(), name='detail'),
    ]
