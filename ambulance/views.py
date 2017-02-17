from django.shortcuts import render
from django.http import HttpResponse
from django.views import generic

def index(request):
    return HttpResponse("Hello, world. You're at the ambulance index.")
# Create your views here.
from .models import Registraion
# Create your views here.
class IndexView(generic.ListView):
    template_name = 'ambulance/index.html'
    context_object_name = 'latest_question_list'

    def get_queryset(self):
        """Return the last five published questions."""
        return Registraion.objects.order_by('-pub_date')[:5]


class DetailView(generic.DetailView):
    model = Registraion
    template_name = 'ambulance/detail.html'


class ResultsView(generic.DetailView):
    model = Registraion
    template_name = 'ambulance/results.html'