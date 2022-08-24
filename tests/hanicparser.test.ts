import * as lib from "../src/index"

describe("Parser test suite", () => {
	let p = new lib.HanicParser()

	it('Filter: "proto 1"', () => {
		expect(p.parse("proto 1")).toEqual(true)
	})

	it('Filter: "or"', () => {
		expect(() => {
			p.parse("or")
		}).toThrow(
			"The and/or operators must be places between two expressions!"
		)
	})

	it('Filter: "proto 1 proto 2"', () => {
		expect(() => {
			p.parse("proto 1 proto 2")
		}).toThrow("You must include an and/or operator between rules!")
	})

	it("Filter: all protocols", () => {
		let s = "(proto 0)"
		for (let i = 1; i < 256; i++) {
			s += "or (proto " + i + ")"
		}
		expect(p.parse(s)).toEqual(true)
	})

	it("Filter: long IP list", () => {
		let s =
			"ip 147.32.112.0/20 or ip 147.32.30.0/23 or ip 147.32.98.0/24 or ip 147.32.88.0/21 or ip 147.32.110.0/23 or ip 147.32.107.0/24 or ip 147.32.96.0/23 or ip 147.32.104.0/23 or ip 147.32.108.0/24"
		expect(p.parse(s)).toEqual(true)
	})

	it("Filter: long IP list 2", () => {
		let s =
			"ip 78.128.128.0/17 or ip 146.102.0.0/16 or ip 147.32.0.0/15 or ip 147.228.0.0/16 or ip 147.230.0.0/15 or ip 147.251.0.0/16 or ip 158.194.0.0/16 or ip 158.196.0.0/16 or ip 160.216.0.0/15 or ip 185.8.160.0/22 or ip 193.84.32.0/20 or ip 193.84.53.0/24 or ip 193.84.55.0/24 or ip 193.84.56.0/21 or ip 193.84.80.0/22 or ip 193.84.116.0/23 or ip 193.84.160.0/20 or ip 193.84.192.0/19 or ip 193.84.192.0/20 or ip 193.84.208.0/20 or ip 195.113.0.0/16 or ip 195.178.64.0/19"
		expect(p.parse(s)).toEqual(true)
	})

	it("Filter: long IPv4 and IPv6 list", () => {
		let s =
			"ip 195.113.86.32/27 or ip 195.113.87.192/26 or ip 195.113.123.56/30 or ip 195.113.132.0/22 or ip 195.113.145.0/24 or ip 195.113.146.0/24 or ip 195.113.148.32/27 or ip 195.113.148.64/27 or ip 195.113.148.144/30 or ip 195.113.148.168/29 or ip 195.113.153.0/25 or ip 195.113.153.108/30 or ip 195.113.154.0/24 or ip 195.113.155.0/24 or ip 195.113.164.128/27 or ip 195.113.180.188/30 or ip 195.113.180.192/26 or ip 195.113.185.136/29 or ip 195.113.207.232/29 or ip 195.113.241.0/24 or ip 195.113.242.0/25 or ip 195.113.242.128/27 or ip 2001:718:0:7::/64 or ip 2001:718:0:9::/64 or ip 2001:718:7::/48 or ip 2001:718:9::/48 or ip 2001:718:800:c::/64 or ip 2001:718:80c::/48"
		expect(p.parse(s)).toEqual(true)
	})

	it("Filter: proto, port, and IPv4", () => {
		let s = "proto 6 and port 443 and ip 146.102.0.0/16"
		expect(p.parse(s)).toEqual(true)
	})
})
