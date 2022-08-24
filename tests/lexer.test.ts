import * as lib from '../src/index'

describe('Basic filter test', () => {

	let l = new lib.Lexer("")
	
	it('Filter: "proto 1"' , () => {
		l.init("proto 1")
		expect(l.get_next_token()).toEqual({"type": "proto", "value": null})
		expect(l.get_next_token()).toEqual({"type": "NUMBER", "value": 1})
		expect(l.get_next_token()).toEqual({"type": "EOF", "value": null})
	});

	it('Filter: "(proto 1 or proto 2) and port 2345"', () => {
		l.init("(proto 1 or proto 2) and port 2345")
		expect(l.get_next_token()).toEqual({"type": "(", "value": null})
		expect(l.get_next_token()).toEqual({"type": "proto", "value": null})
		expect(l.get_next_token()).toEqual({"type": "NUMBER", "value": 1})
		expect(l.get_next_token()).toEqual({"type": "or", "value": null})
		expect(l.get_next_token()).toEqual({"type": "proto", "value": null})
		expect(l.get_next_token()).toEqual({"type": "NUMBER", "value": 2})
		expect(l.get_next_token()).toEqual({"type": ")", "value": null})
		expect(l.get_next_token()).toEqual({"type": "and", "value": null})
		expect(l.get_next_token()).toEqual({"type": "port", "value": null})
		expect(l.get_next_token()).toEqual({"type": "NUMBER", "value": 2345})
		expect(l.get_next_token()).toEqual({"type": "EOF", "value": null})
	});

	it('Filter: "ip 192.168.1.1"', () => {
		l.init("ip 192.168.1.1")
		expect(l.get_next_token()).toEqual({"type": "ip", "value": null})
		expect(l.get_next_token()).toEqual({"type": "IP_ADDR", "value": "192.168.1.1"})
		expect(l.get_next_token()).toEqual({"type": "EOF", "value": null})
	})

	it('Filter: "dip 147.32.83.192/27"', () => {
		l.init("dip 147.32.83.192/27")
		expect(l.get_next_token()).toEqual({"type": "dip", "value": null})
		expect(l.get_next_token()).toEqual({"type": "IP_ADDR", "value": "147.32.83.192/27"})
		expect(l.get_next_token()).toEqual({"type": "EOF", "value": null})
	})

	it('Filter: "sip 2001:718:811:7000::94/128"', () => {
		l.init("sip 2001:718:811:7000::94/128")
		expect(l.get_next_token()).toEqual({"type": "sip", "value": null})
		expect(l.get_next_token()).toEqual({"type": "IP_ADDR", "value": "2001:718:811:7000::94/128"})
		expect(l.get_next_token()).toEqual({"type": "EOF", "value": null})
	})
});

