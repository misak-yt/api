module.exports = {
	devServer: {
		proxy: {
			'small_area': {
				target: 'http://webservice.recruit.co.jp/hotpepper/'
			},
			'middle_area': {
				target: 'http://webservice.recruit.co.jp/hotpepper/'
			},
			'large_area': {
				target: 'http://webservice.recruit.co.jp/hotpepper/'
			},
			'gourmet': {
				target: 'http://webservice.recruit.co.jp/hotpepper/'
			},
		}
	}
}