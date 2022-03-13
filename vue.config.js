module.exports = {
	devServer: {
		proxy: {
			'v1': {
				target: 'http://webservice.recruit.co.jp/hotpepper/gourmet/'
			}
		}
	}
}