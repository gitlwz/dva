import * as React from 'react';
import { UDFCompatibleDatafeed } from '../UDFCompatibleDatafeed/udf-compatible-datafeed';
const language = !!window.localStorage.getItem("language") && window.localStorage.getItem("language") == "English" ? 'en' : 'zh';
let widget = null;
let widgetOptions = {
	// overrides: {
	// 	'paneProperties.background': "#181B2A",
	// 	'paneProperties.vertGridProperties.color': '#1D263D',
	// 	'paneProperties.horzGridProperties.color': '#1D263D',
	// 	'scalesProperties.textColor': "#61688A",
	// 	'scalesProperties.showStudyLastValue': true,
	// 	linetoolbarspattern: {
	// 		singleChartOnly: true,
	// 		color: 'rgba( 255, 0, 0, 1)',
	// 		mode: 0,
	// 		mirrored: false,
	// 		flipped: false
	// 	}
	// },
	interval: '1',
	// toolbar_bg: '#1D263D',
	container_id: "tv_chart_container",
	library_path: "./charting_library/",
	locale: language,
	autosize: true,
	"session": "0000-2400:1234567",
	supported_resolutions: ["1", "15", "30", "60", "240", "1D", "5D", "1W", "1M"],
	drawings_access: { type: 'black', tools: [{ name: "Regression Trend" }] },
	disabled_features: ["volume_force_overlay", 'timeframes_toolbar', 'control_bar', 'pane_context_menu', 'show_hide_button_in_legend', 'header_undo_redo', 'timezone_menu', 'header_symbol_search', 'symbol_search_hot_key', 'header_interval_dialog_button', 'show_interval_dialog_on_key_press', 'header_compare', 'header_screenshot', 'compare_symbol', 'pane_context_menu', 'legend_context_menu', 'main_series_scale_menu', 'scales_context_menu', 'symbol_info'],
	enabled_features: ['hide_left_toolbar_by_default'],
	// loading_screen: {
	// 	backgroundColor: "#ffffff"
	// },
	charts_storage_api_version: "1.1",
	client_id: 'tradingview.com',
	user_id: 'public_user',
	timezone: "Asia/Shanghai",
}
/**
 * datafeedUrl 请求地址
 * symbol行情
 */
export class TVChartContainer extends React.PureComponent {
	static defaultProps = {
		datafeedUrl: "/sundax/restfulservice/tradingViewService",
		symbol: 'BTC-ETH',
	};
	componentDidMount = () => {
		widgetOptions.datafeed = new UDFCompatibleDatafeed(this.props.datafeedUrl);
		widgetOptions.symbol = this.props.symbol;
		// window.TradingView.onready(() => {
		widget = window.tvWidget = new window.TradingView.widget(widgetOptions);
		localStorage.setItem("tradingview.IntervalWidget.quicks", JSON.stringify({ "1": true, "15": true, "30": true, "60": true, "240": true, "1D": true, "5D": true, "1W": true, "1M": true }))
		widget.onChartReady(() => {

			//添加分时按钮
			this.insertBeforeBtn();
			this.addMa(5, widget)
			this.addMa(10, widget)
			this.addMa(20, widget)
			this.addMa(30, widget)
			// widget.addCustomCSSFile("./css/light.css")
			// widget.applyOverrides({
			// 	'paneProperties.background': "#181B2A",
			// 	'paneProperties.vertGridProperties.color': '#1D263D',
			// 	'paneProperties.horzGridProperties.color': '#1D263D',
			// 	'scalesProperties.textColor': "#61688A",
			// 	'scalesProperties.showStudyLastValue': true,
			// 	linetoolbarspattern: {
			// 		singleChartOnly: true,
			// 		color: 'rgba( 255, 0, 0, 1)',
			// 		mode: 0,
			// 		mirrored: false,
			// 		flipped: false
			// 	}
			// })
		})
	}

	componentWillReceiveProps = (nextProps) => {
		if (nextProps.symbol !== this.props.symbol && !!widget && !!widget.chart) {
			clearTimeout(this.setTimeoutName)
			this.setTimeoutName = setTimeout(() => {
				widget.chart().setSymbol(nextProps.symbol, () => {
					if (typeof this.props.symbolChange === "function") {
						this.props.symbolChange();
					}
				})
			}, 500)
		}

		if (this.props.theme != nextProps.theme && nextProps.theme == "white") {
			setTimeout(() => {
				widget.addCustomCSSFile("./css/light.css")
				widget.applyOverrides({
					'paneProperties.background': "#ffffff",
					'paneProperties.vertGridProperties.color': '#E6E6E6',
					'paneProperties.horzGridProperties.color': '#E6E6E6',
					'scalesProperties.textColor': "#555",
					'scalesProperties.showStudyLastValue': false,
					linetoolbarspattern: {
						singleChartOnly: true,
						color: 'rgba( 255, 0, 0, 1)',
						mode: 0,
						mirrored: false,
						flipped: false
					}
				})
			}, 100)
		}
		if (this.props.theme != nextProps.theme && nextProps.theme == "dark") {
			setTimeout(() => {
				widget.addCustomCSSFile("./css/dark.css")
				widget.applyOverrides({
					'paneProperties.background': "#181B2A",
					'paneProperties.vertGridProperties.color': '#1D263D',
					'paneProperties.horzGridProperties.color': '#1D263D',
					'scalesProperties.textColor': "#61688A",
					'scalesProperties.showStudyLastValue': true,
					linetoolbarspattern: {
						singleChartOnly: true,
						color: 'rgba( 255, 0, 0, 1)',
						mode: 0,
						mirrored: false,
						flipped: false
					}
				})
			}, 100)
		}
	}
	addMa = (num, widget) => {
		widget.chart().createStudy("Moving Average", false, false, [num], function (guid) {
			console.log(guid);
		})
	}
	componentWillUnmount = () => {
		if (!window.TVChartContainer) {
			window.TVChartContainer = [];
		}
		window.TVChartContainer.forEach((ele) => {
			window.clearInterval(ele);
		})
	}
	//添加分时按钮
	insertBeforeBtn = () => {
		// let iframeDocument = document.querySelector("#tv_chart_container iframe").contentDocument
		// let quick = iframeDocument.querySelector(".chart-page .group .quick")
		// if(!quick.firstChild.attributes.getNamedItem("fenshi")){
		// 	let btn = iframeDocument.createElement("span")
		// 	btn.setAttribute("class","apply-common-tooltip");
		// 	btn.setAttribute("title","分时");
		// 	btn.setAttribute("fenshi","true");
		// 	btn.innerHTML = "分时";
		// 	quick.insertBefore(btn,quick.firstChild);
		// }
	}
	render() {
		return (
			<div
				style={{ height: '100%' }}
				id="tv_chart_container"
				className={'TVChartContainer'}
			/>
		);
	}
}
