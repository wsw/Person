seajs.config({
	alias: {
		'$': 'jquery/jquery/1.10.1/jquery',
		'bootstrap': 'gallery/bootstrap/3.0.0/bootstrap',
        'bootstrap-paginator': 'gallery/bootstrap/3.0.0/bootstrap-paginator',
//		'reg':'customer/reg',
//        'index': 'customer/index',
//        'header': 'customer/header',
//        'post': 'customer/post',
//        'list': 'customer/tpl/list',
//        'auto': 'customer/auto',
//        'reg':'dist/reg',
//        'index': 'dist/index',
//        'header': 'dist/header',
//        'post': 'dist/post',
//        'list': 'dist/tpl/list',
//        'auto': 'dist/auto',
        'reg':'dist/customer/reg',
        'index': 'dist/customer/index',
        'header': 'dist/customer/header',
        'post': 'dist/customer/post',
        'list': 'dist/customer/tpl/list',
        'auto': 'dist/customer/auto',
        'editor': 'ueditor/ueditor',
        'autocomplete': 'arale/autocomplete/1.3.0/autocomplete'
	},
    plugins: ['combo']
})