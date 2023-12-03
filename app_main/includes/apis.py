from django.urls import path
from django.views.generic import RedirectView

from ..app_api.analysis.analysis_registration_api import AnalysisRegistrationAPI
from ..app_api.analyte.analytes_units import AnalyteUnitsRegistrationAPI
from ..app_api.analyte.analytica_method_registration import AnalyticMethodRegistrationAPI
from ..app_api.equipment.balance_registration import BalanceReagentRegistrationAPI
from ..app_api.login_api import LoginApi
from ..app_api.logout import Logout
from ..app_api.reagents.crm_reagent_registration import CrmReagentRegistrationAPI
from ..app_api.reagents.primary_reagents_registration import PrimaryReagentRegistrationAPI
from ..app_api.reagents.secondary_reagent_precursor import SecondaryReagentPrecursorAPI
from ..app_api.reagents.secondary_reagent_registration import SecondaryReagentRegistrationAPI
from ..app_api.sample.option_select_analytes import OptionSelectAnalytes
from ..app_api.sample.sample_preparation_method_registration import SamplePreparationMethodRegistrationAPI
from ..app_api.sample.sample_registration import SampleRegistrationAPI
from ..app_api.sample.analyte_register import AnalyteRegisterAPI
from ..app_api.weight.weight_set_register import WeightSetRegistrationAPI

urlpatterns = [
    path("login/", LoginApi.as_view()),

    path('favicon.ico', RedirectView.as_view(url='/static/favicon.ico')),

    # sample registration
    path("sample-registration/", SampleRegistrationAPI.as_view()),
    path("optionsSelectAnalyte/", OptionSelectAnalytes.as_view()),
    path("sample-preparation-method-registration/", SamplePreparationMethodRegistrationAPI.as_view()),

    # analyte register
    path("analyte-registration/", AnalyteRegisterAPI.as_view()),
    path("analytical-method-registration/", AnalyticMethodRegistrationAPI.as_view()),

    # analyte unite registration
    path("analyte-unit-registration/", AnalyteUnitsRegistrationAPI.as_view()),

    # primary reagent registration
    path("primary-reagent-registration/", PrimaryReagentRegistrationAPI.as_view()),

    # analysis registration
    path("analysis-registration/", AnalysisRegistrationAPI.as_view()),

    # crm registration
    path("crm-registration/", CrmReagentRegistrationAPI.as_view()),

    # secondary reagent registration
    path("secondary-precursor/", SecondaryReagentPrecursorAPI.as_view()),
    path("secondary-reagent-registration/", SecondaryReagentRegistrationAPI.as_view()),

    # equipment registration
    path("balance-registration/", BalanceReagentRegistrationAPI.as_view()),

    # weight set registration
    path("weight-set-registration/", WeightSetRegistrationAPI.as_view()),

    # logout
    path("logout/", Logout.as_view())

]
