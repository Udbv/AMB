from django.shortcuts import get_object_or_404,render
from django.http import HttpResponse,HttpResponseRedirect
from django.views import generic
from django.template import RequestContext, loader
from django.http import Http404
from .models import Reg,New
from django.core.urlresolvers import reverse

# Create your views here.
class IndexView(generic.ListView):
    template_name = 'ambulance/index.html'
    context_object_name = 'latest_reg_list'

    def get_queryset(self):
        """Return the last five published questions."""
        return Reg.objects.order_by('-reg_date')[:5]


class DetailView(generic.DetailView):
    model = Reg
    template_name = 'ambulance/detail.html'


class ResultsView(generic.DetailView):
    model = Reg
    template_name = 'ambulance/results.html'


def vote(request, question_id):
    question = get_object_or_404(Reg, pk=question_id)
    try:
        selected_choice = question.choice_set.get(pk=request.POST['choice'])
    except (KeyError, New.DoesNotExist):
        # Redisplay the question voting form.
        return render(request, 'polls/detail.html', {
            'question': question,
            'error_message': "You didn't select a choice.",
        })
    else:
        selected_choice.votes += 1
        selected_choice.save()
        # Always return an HttpResponseRedirect after successfully dealing
        # with POST data. This prevents data from being posted twice if a
        # user hits the Back button.
        return HttpResponseRedirect(reverse('ambulance:results', args=(question.id,)))