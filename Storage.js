import m from 'mori';

class Storage {
	constructor(_namespaces) {
		this._namespaces = _namespaces || m.hashMap();

		var _passthrough = (call) => {
			return (a, b, c, d) => {
				var ns = m.get(this._namespaces, m.first(a));
				a = m.rest(a);
				return ns[call].call(ns, a, b, c, d);
			};
		}

		this.get = _passthrough('get');
		this.set = _passthrough('set');
		this.isLoading = _passthrough('isLoading');
		this.isError = _passthrough('isError');
		this.action = _passthrough('action');
	}

	register(k, v) {
		this._namespaces = m.assoc(this._namespaces, k, v);
	}

	clone() {
		return new Storage(this._namespaces);
	}
}

export default Storage;