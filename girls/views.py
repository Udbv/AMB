
from django.http import HttpResponse, HttpResponseRedirect
from django.template import RequestContext, loader
from django.shortcuts import get_object_or_404, render
from django.http import Http404
from django.core.urlresolvers import reverse
from django.views import generic

# Create your views here.
class IndexView(generic.ListView):
    template_name = 'php/Profiles.html'


    def get_queryset(self):
        """Return the last five published questions."""
        return "You are in index"