# -*- coding: utf-8 -*-

import scrapy
import urllib
from scrapy.http import Request
from war_texts.items import WarTextsItem


class WarTextsGlobalSec(scrapy.Spider):
	
	name = 'global_sec'
	
	start_urls = [
		'http://www.globalsecurity.org/military/world/war/19th-century.htm',
		'http://www.globalsecurity.org/military/world/war/20th-century.htm'
	]


	def parse(self, response):

		table_wars = response.xpath("//table[2]//tr[@valign='TOP']")

		for row in table_wars:
			war_id = row.xpath("./td[1]/text()").extract_first()
			if war_id and war_id != u'\xa0':
				item = WarTextsItem()
				item['war_id'] = int(war_id)
				link = row.xpath("./td[2]//a/@href").extract_first()
				if link:
					yield response.follow(link, meta = {'item': item}, callback = self.parse_text)
				else:
					item['text'] = None
					yield item


		return

	def parse_text(self, response):

		item = response.meta['item']

		text = response.xpath("//div[@id='content']/p/text()").extract()
		text = ''.join(text)

		item['text'] = text

		return item