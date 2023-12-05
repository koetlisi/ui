from django.urls import path
from django.views.generic import RedirectView

from .. import views

urlpatterns = [
    # login form view
    path("", views.home, name="home"),

    # admin dashboard view
    path("dashboard/", views.admin, name="admin"),

    path('favicon.ico/', RedirectView.as_view(url='/static/favicon.ico')),

    # sample registration view
    path("register-sample/", views.register_sample, name="create-sample"),

    # sample weight view
    path("sample_weight/", views.sample_weight, name="sample_weight"),

    # peroxide weight view
    path("peroxide_weight/", views.peroxide_weight, name="peroxide_weight"),

    # furnace form
    path("furnace_form/", views.furnace_form, name="furnace_form"),

    # analytes register
    path("analytes_register/", views.analytes_register, name="analytes_register"),

    # analytes units register
    path("analyte_units_register/", views.analyte_units_register, name="analyte_units_register"),

    # primary reagent registration
    path("primary_reagent/", views.primary_reagent, name="reagents"),

    # secondary reagent registration
    path("secondary_reagents/", views.secondary_reagents, name="secondary_reagents"),

    # crms reagent registration
    path("crms_reagents/", views.crms_reagents, name="crms_reagents"),

    # analyses method register
    path("analyses_methods/", views.analyses_methods, name="analyses_methods"),

    # analyses method register
    path("analytical_methods/", views.analytical_methods, name="analytical_methods"),

    # sample preparation method register
    path("sample_prep_methods/", views.sample_prep_methods, name="sample_prep_methods"),

    # balance calibration
    path("balance_calibration/", views.balance_calibration, name="balance_calibration"),

    # balance registration
    path("balance_register/", views.balance_register, name="balance_registration"),

    # ICP-OES_checklist
    path("ICP-OES_checklist/", views.ICP_OES_check, name="ICP-OES_checklist"),

    # weightset_register
    path("weightset_register/", views.weightset_register, name="weightset_register"),

    # hotplate register
    path("hotplate_register/", views.hotplate_register, name="hotplate_register"),

    #thermometer register
    path("thermometer_register/", views.thermometer_register, name="thermometer_register"),

    #manual dilution
    path("manual_dilution/", views.manual_dilution, name="manual_dilution"),

    #auto dilution
    path("auto_dilution/", views.auto_dilution, name="auto_dilution"),

    # glassware register
    path("glassware_register/", views.glassware_register, name="glassware_register"),

    # auto dispenser register
    path("auto_dispenser_register/", views.auto_dispenser_register, name="auto_dispenser_register"),

    # Hotplate Form
    path("hotplate_form/", views.hotplate_form, name="hotplate_form"),

    # storage register
    path("storage_register/", views.storage_register, name="storage_register"),

    # lab register
    path("lab_register/", views.lab_register, name="lab_register"),

    # office register
    path("office_register/", views.office_register, name="office_register"),

    # permissions register
    path("permissions_register/", views.permissions_register, name="permissions_register"),

    # Roles register
    path("roles_register/", views.roles_register, name="roles_register"),

]
