from django.shortcuts import render, redirect

from .functions.foms_view.view_function import view_function
from .functions.jwt_decode import userInformation


def home(request):
    token = request.COOKIES.get('access_token')
    if token is None:
        return render(request, "login.html")
    user = userInformation(token)
    return redirect('/dashboard/')


def admin(request):
    return view_function(request, "pages/dashboard.html")


def register_sample(request):
    return view_function(request, "pages/sample/sample.html")


def sample_weight(request):
    return view_function(request, "pages/weighting/sample_weight.html")


def peroxide_weight(request):
    return view_function(request, "pages/weighting/peroxide_weight.html")


def furnace_form(request):
    return view_function(request, "pages/furnace/furnace_form.html")


def analytes_register(request):
    return view_function(request, "pages/analytes/analytes_register.html")


def analyte_units_register(request):
    return view_function(request, "pages/analytes/analyte_units_register.html")


def primary_reagent(request):
    return view_function(request, "pages/reagents/primary-reagents.html")


def secondary_reagents(request):
    return view_function(request, "pages/reagents/secondary_reagents.html")


def crms_reagents(request):
    return view_function(request, "pages/reagents/crms_reagents.html")


def analyses_methods(request):
    return view_function(request, "pages/analysis/analyses_methods.html")


def analytical_methods(request):
    return view_function(request, "pages/analysis/analytical_methods.html")


def sample_prep_methods(request):
    return view_function(request, "pages/sample/sample_prep_methods.html")


def balance_calibration(request):
    return view_function(request, "pages/weighting/balance_calibration.html")


def balance_register(request):
    return view_function(request, "pages/equipment/balance_register.html")


def ICP_OES_check(request):
    return view_function(request, "pages/equipment/ICP-OES_checklist.html")


def weightset_register(request):
    return view_function(request, "pages/equipment/weightset_register.html")


def hotplate_register(request):
    return view_function(request, "pages/equipment/hotplate_register.html")


def thermometer_register(request):
    return view_function(request, "pages/equipment/thermometer_register.html")


def manual_dilution(request):
    return view_function(request, "pages/dilution/manual_dilution.html")

