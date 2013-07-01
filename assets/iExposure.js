/*
 * iExposure.JS
 * version 0.0.1
 * author: Justin Wu
 * https://github.com/justin3737/iExposure.js
 * Licensed: this software is released under WTFPL http://www.wtfpl.net/
 */
var iExposure = (function iExposureClosure(){
	var iExposure ={
		elms : {
			aptureSel: function(){return $("#aptureSel")},
			isoSel: function(){return $("#isoSel")},
			shutterSel: function(){return $("#shutterSel")},
			shutterTxt: function(){return $("#shutterTxt")},
			startButton: function(){return $("#start")},
			resetButton: function(){return $("#reset")}
		},
		expdata : {
		    aperture: [
	            "F1.0",
	            "F1.4",
	            "F2.0",
	            "F2.8",
	            "F4.0",
	            "F5.6",
	            "F8",
	            "F11",
	            "F16",
	            "F22",
	            "F32",
	            "F45",
	            "F64"
		    ],
		    iso: [
	            "50",
	            "100",
	            "200",
	            "400",
	            "800",
	            "1600",
	            "3200",
	            "6400",
	            "12800",
	            "25600",
	            "51200",
	            "102400",
	            "204800"
		    ],
		    shutter: [
	            "1/8000",
	            "1/4000",
	            "1/2000",
	            "1/1000",
	            "1/500",
	            "1/250",
	            "1/125",
	            "1/60",
	            "1/30",
	            "1/15",
	            "1/8",
	            "1/4",
	            "1/2",
	            "1sec",
	            "2sec",
	            "4sec",
	            "8sec",
	            "15sec",
	            "30sec",
	            "1min",
	            "2min",
	            "4min",
	            "8min",
	            "15min",
	            "30min",
	            "1hr",
	            "2hr",
	            "4hr"
		    ],
		    currentValue : [],
		    setVal : function( string ,value ){
		    	this.currentValue[ string ] = value; 
		    },
		    getVal : function( string ){
		    	return this.currentValue [ string ];
		    }
		},
		init : function (){
			this.elms.resetButton().hide();
			this.createView();
			this.addEvtListener(this);
		},
		createView : function (){
			this.generate( this.expdata.aperture , this.elms.aptureSel() );
			this.generate( this.expdata.iso , this.elms.isoSel() );
			this.generate( this.expdata.shutter , this.elms.shutterSel() );
		},
		generate : function ( data , obj ){
			var optionStr = "";
			for(var i = 0 ; i < data.length ; i++){
				optionStr += "<option value='" + i + "'>" + data[i] + "</option>";
			}
			obj.append(optionStr)
			return;
		},
		addEvtListener : function( _self ){
			this.elms.startButton().on('click',function(){ _self.start(); });
			this.elms.resetButton().on('click',function(){ _self.reset(); });
			this.elms.aptureSel().on('change',function(){ _self.convert( $(this).val(), 'apture'); });
			this.elms.isoSel().on('change',function(){ _self.convert( $(this).val(), 'iso');  });
			this.elms.shutterSel().on('change',function(){ _self.convert( $(this).val(), 'shutter'); });
		},
		start : function(){
			this.elms.startButton().hide();
			this.elms.resetButton().show();
		},
		reset : function(){
			this.elms.startButton().show();
			this.elms.resetButton().hide();
			this.elms.shutterSel().show();
			//this.elms.aptureSel().val(0);
			//this.elms.isoSel().val(0);
			//this.elms.shutterSel().val(0);
			this.elms.shutterTxt().val("");
		},
		convert : function( value ,string ){
			var isShow = this.elms.resetButton().css('display');
			var _self = this.expdata;
			if(isShow == 'inline-block'){
				//check the value is not empty
				if( !_self.currentValue.apture || !_self.currentValue.iso || !_self.currentValue.shutter ){

					alert('請設置一組當前環境的曝光值,再按下start');

				}else{
					//convert function here....
					this.elms.shutterSel().hide();

					var _currApture = _self.getVal('apture'),
						_currIso = _self.getVal('iso'),
						_currShutter = _self.getVal('shutter'),
						_nowVal = parseInt(value),
						_nowGap = null,
						_nowShutter = null,
						_shutterTxt = "";

					if( string == 'apture'){
						_nowGap = _currApture - _nowVal;
						_nowShutter = _currShutter - _nowGap;
					}else{
						_nowGap = _currIso - _nowVal;
						_nowShutter = _currShutter + _nowGap;
					};
					_shutterTxt = this.expdata.shutter[ _nowShutter ];
					this.elms.shutterTxt().val(_shutterTxt);
					
					//update value
					_self.setVal(string , parseInt(value) );
					_self.setVal('shutter' , _nowShutter );
				}
			}else{
				_self.setVal( string , parseInt(value) );
			}
		}
	};
	return iExposure;
})();