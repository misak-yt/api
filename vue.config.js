module.exports = {
	devServer: {
		proxy: {
			'large_area': {
				target: 'http://webservice.recruit.co.jp/hotpepper/'
			},
			'gourmet': {
				target: 'http://webservice.recruit.co.jp/hotpepper/'
			},
		}
	}
}