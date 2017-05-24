# -*- coding: utf-8 -*-

import scrapy
import urllib
from scrapy.http import Request
from war_texts.items import WarTextsItem
from war_texts.constants import WARS_URL_ID


class WarTextsWiki(scrapy.Spider):
	
	name = 'wiki'

	start_urls = [
		'https://en.wikipedia.org/wiki/Indo-Pakistani_War_of_1947',
		'https://en.wikipedia.org/wiki/1948_Arab%E2%80%93Israeli_War',
		'https://en.wikipedia.org/wiki/Korean_War',
		'https://en.wikipedia.org/wiki/Suez_Crisis',
		'https://en.wikipedia.org/wiki/Second_Taiwan_Strait_Crisis',
		'https://en.wikipedia.org/wiki/Sino-Indian_War',
		'https://en.wikipedia.org/wiki/Vietnam_War',
		'https://en.wikipedia.org/wiki/Indo-Pakistani_War_of_1965',
		'https://en.wikipedia.org/wiki/Six-Day_War',
		'https://en.wikipedia.org/wiki/Laotian_Civil_War',
		'https://en.wikipedia.org/wiki/War_of_Attrition',
		'https://en.wikipedia.org/wiki/Football_War',
		'https://en.wikipedia.org/wiki/Cambodian_Civil_War',
		'https://en.wikipedia.org/wiki/Bangladesh_Liberation_War',
		'https://en.wikipedia.org/wiki/Yom_Kippur_War',
		'https://en.wikipedia.org/wiki/Turkish_invasion_of_Cyprus',
		'https://en.wikipedia.org/wiki/Angolan_Civil_War',
		'https://en.wikipedia.org/wiki/Ogaden_War',
		'https://en.wikipedia.org/wiki/Cambodian%E2%80%93Vietnamese_War',
		'https://en.wikipedia.org/wiki/Uganda%E2%80%93Tanzania_War',
		'https://en.wikipedia.org/wiki/Sino-Vietnamese_War',
		'https://en.wikipedia.org/wiki/Iran%E2%80%93Iraq_War',
		'https://en.wikipedia.org/wiki/Falklands_War',
		'https://en.wikipedia.org/wiki/1982_Lebanon_War',
		'https://en.wikipedia.org/wiki/Toyota_War',
		'https://en.wikipedia.org/wiki/Sino-Vietnamese_War',
		'https://en.wikipedia.org/wiki/Gulf_War',
		'https://en.wikipedia.org/wiki/Bosnian_War',
		'https://en.wikipedia.org/wiki/Nagorno-Karabakh_War',
		'https://en.wikipedia.org/wiki/Cenepa_War',
		'https://en.wikipedia.org/wiki/Eritrean%E2%80%93Ethiopian_War',
		'https://en.wikipedia.org/wiki/Kosovo_War',
		'https://en.wikipedia.org/wiki/Kargil_War',
		'https://en.wikipedia.org/wiki/United_States_invasion_of_Afghanistan',
		'https://en.wikipedia.org/wiki/2003_invasion_of_Iraq'
	]


	def parse(self, response):

		for war in WARS_URL_ID:
			if war['url'] == response.url:	
				item = WarTextsItem()
				
				item['war_id'] = war['war_id']

				text = response.xpath("//div[@id='mw-content-text']/p//text()[not(starts-with(., '['))]").extract()
				text = ''.join(text)
				item['text'] = text

				yield item

		return