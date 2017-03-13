# -*- coding: utf-8 -*-

from django.apps import AppConfig as BaseConfig
from django.utils.translation import ugettext_lazy as _


class AppConfig(BaseConfig):
    name = 'menu'
    verbose_name = _('Menu')
