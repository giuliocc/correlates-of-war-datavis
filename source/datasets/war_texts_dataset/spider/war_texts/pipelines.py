# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: http://doc.scrapy.org/en/latest/topics/item-pipeline.html

import json



class WarTextsPipeline(object):
    def process_item(self, item, spider):
    	file = open('inter_war_texts.json', 'a')

    	text = json.dumps({
    		'war_id': item['war_id'],
    		'text': item['text']
		})
    	file.write(text + ',\n')
    	file.close()

        return item
