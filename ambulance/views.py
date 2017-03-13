from django.views import generic

from .models import Reg,  Emp, Journal, Calls


# Create your views here.

#базова сторінка,має виводити списко пацієнтів без деталей


class IndexView(generic.ListView):
    template_name = 'ambulance/index.html'
    context_object_name = 'base_site'

    def get_queryset(self):
        """Return the last five published questions."""
        return Reg.objects.order_by('-reg_date')[:5]

#Сторінка пацієнта,має бути вся інфа


class DetailView(generic.DetailView):
    model = Reg
    template_name = 'ambulance/detail.html'

#Журнал виїздів швидкої допомоги.Має бути видно


class JournalView(generic.ListView):
    model = Journal
    template_name = 'ambulance/journal.html'
    context_object_name = 'journal_list'


class JournalDetail(generic.DetailView):
    model = Journal
    template_name = 'ambulance/journal_detail.html'


class EmployeesView(generic.ListView):
    model = Emp
    template_name = 'ambulance/employees.html'
    context_object_name = 'employees_list'


class Calls(generic.ListView):
    model = Calls
    template_name = 'ambulance/calls.html'
    context_object_name = 'calls_list'


class CallsDetail(generic.DetailView):
    model = Calls
    template_name = 'ambulance/call_detail.html'



class Patient(generic.ListView):
    template_name = 'ambulance/patients.html'
    context_object_name = 'latest_reg_list'

    def get_queryset(self):
        """Return the last five published questions."""
        return Reg.objects.order_by('-reg_date')[:5]


class EmployeesDetailView(generic.DetailView):
    model = Emp
    template_name = 'ambulance/detail_employees.html'

