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

	it("Filter: long filter mix", () => {
		let s =
			"(proto 6 and ip 3.0.148.67 and (port 3333)) or (proto 6 and ip 3.35.247.215 and (port 20535)) or (proto 6 and ip 3.83.69.172 and (port 3333)) or (proto 6 and ip 3.84.144.138 and (port 3333)) or (proto 6 and ip 3.88.235.65 and (port 3333)) or (proto 6 and ip 3.93.149.21 and (port 3333)) or (proto 6 and ip 3.120.132.95 and (port 3333)) or (proto 6 and ip 13.124.125.164 and (port 20535)) or (proto 6 and ip 13.125.57.231 and (port 20535)) or (proto 6 and ip 13.125.88.95 and (port 20535)) or (proto 6 and ip 13.213.240.246 and (port 25 or port 443 or port 1800)) or (proto 6 and ip 13.228.131.69 and (port 25 or port 443 or port 1800)) or (proto 6 and ip 13.248.151.222 and (port 25 or port 443 or port 1800)) or (proto 6 and ip 13.248.162.234 and (port 25 or port 443 or port 1800 or port 3333 or port 8888)) or (proto 6 and ip 15.164.131.135 and (port 20535)) or (proto 6 and ip 15.222.246.123 and (port 3333)) or (proto 6 and ip 15.223.66.255 and (port 3333)) or (proto 6 and ip 18.139.36.119 and (port 25 or port 443 or port 1800)) or (proto 6 and ip 18.177.82.104 and (port 3333)) or (proto 6 and ip 18.184.127.10 and (port 3333)) or (proto 6 and ip 18.184.174.79 and (port 3333)) or (proto 6 and ip 18.184.182.16 and (port 3333)) or (proto 6 and ip 18.197.142.87 and (port 3333)) or (proto 6 and ip 18.204.40.75 and (port 20535)) or (proto 6 and ip 35.156.160.57 and (port 20535)) or (proto 6 and ip 35.183.104.72 and (port 3333)) or (proto 6 and ip 45.32.71.82 and (port 14444)) or (proto 6 and ip 45.55.41.36 and (port 3333)) or (proto 6 and ip 45.55.43.129 and (port 3333)) or (proto 6 and ip 45.76.65.223 and (port 14444)) or (proto 6 and ip 46.101.135.192 and (port 3333)) or (proto 6 and ip 46.101.135.245 and (port 3333)) or (proto 6 and ip 46.101.145.131 and (port 3333)) or (proto 6 and ip 46.101.236.153 and (port 3333)) or (proto 6 and ip 46.105.31.147 and (port 14444)) or (proto 6 and ip 47.91.78.78 and (port 443 or port 700 or port 1883)) or (proto 6 and ip 47.251.37.32 and (port 25 or port 443 or port 8008)) or (proto 6 and ip 47.254.129.206 and (port 443 or port 700 or port 1883)) or (proto 6 and ip 49.12.130.173 and (port 80 or port 443 or port 3333 or port 5555 or port 7777 or port 8888)) or (proto 6 and ip 51.15.54.102 and (port 14444)) or (proto 6 and ip 51.15.55.100 and (port 14444)) or (proto 6 and ip 51.15.55.162 and (port 14444)) or (proto 6 and ip 51.15.58.224 and (port 14444)) or (proto 6 and ip 51.15.65.182 and (port 14444)) or (proto 6 and ip 51.15.67.17 and (port 14444)) or (proto 6 and ip 51.15.69.136 and (port 14444)) or (proto 6 and ip 51.15.78.68 and (port 14444)) or (proto 6 and ip 51.68.21.186 and (port 3333 or port 3333 or port 4444 or port 4444)) or (proto 6 and ip 51.68.21.188 and (port 3333 or port 3333 or port 4444 or port 4444)) or (proto 6 and ip 51.68.143.81 and (port 14444)) or (proto 6 and ip 51.79.226.3 and (port 3333 or port 4444)) or (proto 6 and ip 51.79.236.43 and (port 3333 or port 4444)) or (proto 6 and ip 51.81.151.235 and (port 3333 or port 4444)) or (proto 6 and ip 51.81.195.38 and (port 3333 or port 4444)) or (proto 6 and ip 51.83.33.228 and (port 14444)) or (proto 6 and ip 51.89.96.41 and (port 2222 or port 3333)) or (proto 6 and ip 51.89.217.80 and (port 443 or port 3333 or port 5555 or port 7777)) or (proto 6 and ip 51.210.104.91 and (port 80 or port 443 or port 13333 or port 15555 or port 17777 or port 23333)) or (proto 6 and ip 51.222.149.40 and (port 3333 or port 4444)) or (proto 6 and ip 51.222.149.99 and (port 3333 or port 4444)) or (proto 6 and ip 51.222.193.76 and (port 3333 or port 4444)) or (proto 6 and ip 51.254.84.37 and (port 3333 or port 3333 or port 4444 or port 4444)) or (proto 6 and ip 51.255.34.79 and (port 14444)) or (proto 6 and ip 51.255.34.80 and (port 14444)) or (proto 6 and ip 51.255.34.118 and (port 14444)) or (proto 6 and ip 52.28.62.245 and (port 3333)) or (proto 6 and ip 52.58.211.215 and (port 3333)) or (proto 6 and ip 54.89.191.69 and (port 3333)) or (proto 6 and ip 54.90.75.213 and (port 3333)) or (proto 6 and ip 54.92.80.66 and (port 3333)) or (proto 6 and ip 54.180.61.32 and (port 20535)) or (proto 6 and ip 64.225.62.255 and (port 3333)) or (proto 6 and ip 66.42.105.146 and (port 14444)) or (proto 6 and ip 75.2.37.253 and (port 25 or port 443 or port 1800)) or (proto 6 and ip 75.2.87.245 and (port 443 or port 443 or port 1800 or port 1800 or port 3333 or port 3333 or port 8888 or port 8888)) or (proto 6 and ip 76.223.24.27 and (port 25 or port 443 or port 1800)) or (proto 6 and ip 76.223.62.235 and (port 25 or port 443 or port 1800 or port 3333 or port 8888)) or (proto 6 and ip 91.237.249.92 and (port 3333)) or (proto 6 and ip 91.237.249.93 and (port 3333)) or (proto 6 and ip 94.130.12.27 and (port 80 or port 3333 or port 5555 or port 7777 or port 8080)) or (proto 6 and ip 94.130.12.30 and (port 80 or port 3333 or port 5555 or port 7777 or port 8080)) or (proto 6 and ip 94.130.164.163 and (port 3333 or port 3333 or port 4444 or port 4444)) or (proto 6 and ip 94.130.165.85 and (port 3333 or port 3333 or port 4444 or port 4444)) or (proto 6 and ip 94.130.165.87 and (port 3333 or port 3333 or port 4444 or port 4444)) or (proto 6 and ip 99.79.195.99 and (port 3333)) or (proto 6 and ip 99.83.150.206 and (port 443 or port 443 or port 1800 or port 1800 or port 3333 or port 3333 or port 8888 or port 8888)) or (proto 6 and ip 99.83.247.2 and (port 25 or port 443 or port 1800)) or (proto 6 and ip 103.3.62.64 and (port 14444)) or (proto 6 and ip 104.238.180.207 and (port 14444)) or (proto 6 and ip 128.199.55.158 and (port 3333)) or (proto 6 and ip 135.125.238.108 and (port 14444)) or (proto 6 and ip 136.243.49.177 and (port 3333 or port 3333 or port 4444 or port 4444)) or (proto 6 and ip 138.201.198.155 and (port 4444 or port 4445)) or (proto 6 and ip 139.99.48.226 and (port 3333 or port 4444)) or (proto 6 and ip 139.99.101.197 and (port 14444)) or (proto 6 and ip 139.99.101.198 and (port 14444)) or (proto 6 and ip 139.99.101.232 and (port 14444)) or (proto 6 and ip 139.99.102.70 and (port 14444)) or (proto 6 and ip 139.99.102.71 and (port 14444)) or (proto 6 and ip 139.99.102.72 and (port 14444)) or (proto 6 and ip 139.99.102.73 and (port 14444)) or (proto 6 and ip 139.99.102.74 and (port 14444)) or (proto 6 and ip 139.99.156.30 and (port 14444)) or (proto 6 and ip 139.162.81.90 and (port 14444)) or (proto 6 and ip 139.162.112.195 and (port 14444)) or (proto 6 and ip 142.44.242.100 and (port 14444)) or (proto 6 and ip 142.44.243.6 and (port 14444)) or (proto 6 and ip 142.93.51.122 and (port 3333)) or (proto 6 and ip 142.93.51.135 and (port 3333)) or (proto 6 and ip 144.217.14.109 and (port 14444)) or (proto 6 and ip 144.217.14.139 and (port 14444)) or (proto 6 and ip 147.135.37.31 and (port 3333 or port 4444)) or (proto 6 and ip 149.28.212.250 and (port 14444)) or (proto 6 and ip 151.80.144.188 and (port 14444)) or (proto 6 and ip 165.22.41.73 and (port 3333)) or (proto 6 and ip 167.99.180.109 and (port 3333)) or (proto 6 and ip 167.99.184.249 and (port 3333)) or (proto 6 and ip 167.99.186.215 and (port 3333)) or (proto 6 and ip 167.99.188.242 and (port 3333)) or (proto 6 and ip 168.119.38.182 and (port 80 or port 443 or port 3333 or port 5555 or port 7777 or port 8888)) or (proto 6 and ip 172.65.208.78 and (port 25 or port 443 or port 3333)) or (proto 6 and ip 172.104.165.191 and (port 14444)) or (proto 6 and ip 172.105.211.250 and (port 14444)) or (proto 6 and ip 178.32.120.127 and (port 3333 or port 3333 or port 4444 or port 4444)) or (proto 6 and ip 178.62.197.156 and (port 3333)) or (proto 6 and ip 178.63.100.197 and (port 80 or port 3333 or port 5555 or port 7777 or port 8080)) or (proto 6 and ip 178.128.223.211 and (port 3333)) or (proto 6 and ip 184.72.197.173 and (port 3333)) or (proto 6 and ip 188.166.16.158 and (port 3333)) or (proto 6 and ip 188.166.48.205 and (port 3333)) or (proto 6 and ip 192.99.69.170 and (port 14444)) or (proto 6 and ip 204.48.28.116 and (port 3333)) or (proto 6 and ip 206.189.235.207 and (port 3333)) or (proto 6 and ip 207.246.100.198 and (port 14444)) or (proto 6 and ip 213.32.74.157 and (port 14444)) or (proto 6 and ip 217.182.169.148 and (port 14444))"
		expect(p.parse(s)).toEqual(true)
	})
})
