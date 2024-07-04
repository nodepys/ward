var Key = "e=10001;m=a67c3d83918266494b10732e558006472d46a42d2423b1ddc92c6760e751bf45cceb75ce051bed28be809f737a601dc5875cc4462baae2bc31cb80b70f3d73fd737852a93925d888c874eae9df23b9068eea15770cd99ef419e54ababd72e89fe1e9b9100786100f349d208261fbe16c3ddec6bc9d927632b83b0e4e7a268747f37b9274251b793e95ccd1052787e600dab5f02dd3ab02fb0e5c827fc9dc3f1414f8e3aa21aeb0921498f3d22122b057c003095d5cf4531abd6978a8b3661b92c7081fa0058cfc548c828c76fa39ebea1ee05a5ffd04e596331de7b50eea9dfab23fb7ed21dabf3db87ff7bf5d36883b12207404740d71647b98d0180b48b5f5"; var randomNum = "F1C0543607F09D6DF7408E957D4821AFA2FF1B6B55D9008F73F21F250F74708D95DDBCDB26EF8DE7F78078504AD9F3EB82E2755637CE562BE770EAE33299C5DB14382F5B2A3E7C5451DD14ADC78B263A52C63C9D81CF8219FDF03013A345515ED21BD872"; var SKI = "25CE4D96CB3A09A69CD847C69FC6D40AF4A4DE12";
function exists(e) {
  return e ? !0 : 0 == e || 0 == e || "" == e
}

function isString(e) {
  return "string" == typeof e
}

function isFunction(e) {
  return "function" == typeof e
}

function isArray(e) {
  return e instanceof Array
}

function isDefined(e) {
  return "undefined" != typeof e
}

function valOrEmpty(e) {
  return e ? e : ""
}

function valOrDefault(e, n) {
  return exists(e) ? e : n
}

function getQSValue(e, n) {
  var t = "&" + n.toLowerCase() + "=",
    r = e.toLowerCase().indexOf(t);
  if (-1 == r && (t = "?" + n.toLowerCase() + "=", r = e.toLowerCase().indexOf(t), -1 == r)) {
    return null
  }
  var o = e.indexOf("&", r + 1);
  return -1 == o && (o = e.length), e.substring(r + t.length, o)
}

function strEquals(e, n, t) {
  return isString(e) && isString(n) ? t ? e.toLowerCase() == n.toLowerCase() : e === n : !1
}

function arrExists(e, n) {
  if (!exists(e)) {
    return !1
  }
  for (var t = isArray(n) ? n : arguments, r = isArray(n) ? 0 : 1, o = r; o < t.length; o++) {
    if (!exists(t[o]) || !exists(e[t[o]])) {
      return !1
    }
    e = e[t[o]]
  }
  return !0
}

function Derive(e, n) {
  function t() { }
  var r = n.prototype;
  t.prototype = e.prototype, n.prototype = new t;
  for (var o in r) {
    n.prototype[o] = r[o]
  }
}

function FormatString(e) {
  for (var n = 1; n < arguments.length; n++) {
    e = e.replace(new RegExp("\\{" + (n - 1) + "\\}", "g"), arguments[n])
  }
  return e
}

function DoTestDelay(e) {
  return e(), null
}

function PrintRecoveryCode(e) {
  var n = PrintRecoveryCodeTemplate.format(e.dir.encodeHtml(), e.title.encodeHtml(), e.desc1.encodeHtml(), e.desc2.encodeHtml(), e.rcHeader.encodeHtml(), e.rcValue.encodeHtml(), e.ctHeader.encodeHtml(), e.ctValue.encodeHtml(), e.mnHeader.encodeHtml(), e.mnValue.encodeHtml()),
    t = window.open();
  t.document.write(n), t.document.close(), t.print(), t.focus()
}

function Encrypt(e, n, t, r) {
  var o = [];
  switch (t.toLowerCase()) {
    case "chgsqsa":
      if (null == e || null == n) {
        return null
      }
      o = PackageSAData(e, n);
      break;
    case "chgpwd":
      if (null == e || null == r) {
        return null
      }
      o = PackageNewAndOldPwd(e, r);
      break;
    case "pwd":
      if (null == e) {
        return null
      }
      o = PackagePwdOnly(e);
      break;
    case "pin":
      if (null == e) {
        return null
      }
      o = PackagePinOnly(e);
      break;
    case "proof":
      if (null == e && null == n) {
        return null
      }
      o = PackageLoginIntData(null != e ? e : n);
      break;
    case "saproof":
      if (null == n) {
        return null
      }
      o = PackageSADataForProof(n);
      break;
    case "newpwd":
      if (null == r) {
        return null
      }
      o = PackageNewPwdOnly(r)
  }
  if (null == o || "undefined" == typeof o) {
    return o
  }
  if ("undefined" != typeof Key && void 0 !== parseRSAKeyFromString) {
    var a = parseRSAKeyFromString(Key)
  }
  var i = RSAEncrypt(o, a, randomNum);
  return i
}

function PackageSAData(e, n) {
  var t = [],
    r = 0;
  t[r++] = 1, t[r++] = 1, t[r++] = 0;
  var o, a = n.length;
  for (t[r++] = 2 * a, o = 0; a > o; o++) {
    t[r++] = 255 & n.charCodeAt(o), t[r++] = (65280 & n.charCodeAt(o)) >> 8
  }
  var i = e.length;
  for (t[r++] = i, o = 0; i > o; o++) {
    t[r++] = 127 & e.charCodeAt(o)
  }
  return t
}

function PackagePwdOnly(e) {
  var n = [],
    t = 0;
  n[t++] = 1, n[t++] = 1, n[t++] = 0, n[t++] = 0;
  var r, o = e.length;
  for (n[t++] = o, r = 0; o > r; r++) {
    n[t++] = 127 & e.charCodeAt(r)
  }
  return n
}

function PackagePinOnly(e) {
  var n = [],
    t = 0;
  n[t++] = 1, n[t++] = 2, n[t++] = 0, n[t++] = 0, n[t++] = 0;
  var r, o = e.length;
  for (n[t++] = o, r = 0; o > r; r++) {
    n[t++] = 127 & e.charCodeAt(r)
  }
  return n
}

function PackageLoginIntData(e) {
  var n, t = [],
    r = 0;
  for (n = 0; n < e.length; n++) {
    t[r++] = 255 & e.charCodeAt(n), t[r++] = (65280 & e.charCodeAt(n)) >> 8
  }
  return t
}

function PackageSADataForProof(e) {
  var n, t = [],
    r = 0;
  for (n = 0; n < e.length; n++) {
    t[r++] = 127 & e.charCodeAt(n), t[r++] = (65280 & e.charCodeAt(n)) >> 8
  }
  return t
}

function PackageNewPwdOnly(e) {
  var n = [],
    t = 0;
  n[t++] = 1, n[t++] = 1;
  var r, o = e.length;
  for (n[t++] = o, r = 0; o > r; r++) {
    n[t++] = 127 & e.charCodeAt(r)
  }
  return n[t++] = 0, n[t++] = 0, n
}

function PackageNewAndOldPwd(e, n) {
  var t = [],
    r = 0;
  t[r++] = 1, t[r++] = 1;
  var o, a = n.length;
  for (t[r++] = a, o = 0; a > o; o++) {
    t[r++] = 127 & n.charCodeAt(o)
  }
  for (t[r++] = 0, a = e.length, t[r++] = a, o = 0; a > o; o++) {
    t[r++] = 127 & e.charCodeAt(o)
  }
  return t
}

function mapByteToBase64(e) {
  return e >= 0 && 26 > e ? String.fromCharCode(65 + e) : e >= 26 && 52 > e ? String.fromCharCode(97 + e - 26) : e >= 52 && 62 > e ? String.fromCharCode(48 + e - 52) : 62 == e ? "+" : "/"
}

function base64Encode(e, n) {
  var t, r = "";
  for (t = n; 4 > t; t++) {
    e >>= 6
  }
  for (t = 0; n > t; t++) {
    r = mapByteToBase64(63 & e) + r, e >>= 6
  }
  return r
}

function byteArrayToBase64(e) {
  var n, t, r = e.length,
    o = "";
  for (n = r - 3; n >= 0; n -= 3) {
    t = e[n] | e[n + 1] << 8 | e[n + 2] << 16, o += base64Encode(t, 4)
  }
  var a = r % 3;
  for (t = 0, n += 2; n >= 0; n--) {
    t = t << 8 | e[n]
  }
  return 1 == a ? o = o + base64Encode(t << 16, 2) + "==" : 2 == a && (o = o + base64Encode(t << 8, 3) + "="), o
}

function parseRSAKeyFromString(e) {
  var n = e.indexOf(";");
  if (0 > n) {
    return null
  }
  var t = e.substr(0, n),
    r = e.substr(n + 1),
    o = t.indexOf("=");
  if (0 > o) {
    return null
  }
  var a = t.substr(o + 1);
  if (o = r.indexOf("="), 0 > o) {
    return null
  }
  var i = r.substr(o + 1),
    s = new Object;
  return s.n = hexStringToMP(i), s.e = parseInt(a, 16), s
}

function RSAEncrypt(e, n) {
  for (var t = [], r = 42, o = 2 * n.n.size - r, a = 0; a < e.length; a += o) {
    if (a + o >= e.length) {
      var i = RSAEncryptBlock(e.slice(a), n, randomNum);
      i && (t = i.concat(t))
    } else {
      var i = RSAEncryptBlock(e.slice(a, a + o), n, randomNum);
      i && (t = i.concat(t))
    }
  }
  var s = byteArrayToBase64(t);
  return s
}

function RSAEncryptBlock(e, n, t) {
  var r = n.n,
    o = n.e,
    a = e.length,
    i = 2 * r.size,
    s = 42;
  if (a + s > i) {
    return null
  }
  applyPKCSv2Padding(e, i, t), e = e.reverse();
  var l = byteArrayToMP(e),
    c = modularExp(l, o, r);
  c.size = r.size;
  var u = mpToByteArray(c);
  return u = u.reverse()
}

function JSMPnumber() {
  this.size = 1, this.data = [], this.data[0] = 0
}

function duplicateMP(e) {
  var n = new JSMPnumber;
  return n.size = e.size, n.data = e.data.slice(0), n
}

function byteArrayToMP(e) {
  var n = new JSMPnumber,
    t = 0,
    r = e.length,
    o = r >> 1;
  for (t = 0; o > t; t++) {
    n.data[t] = e[2 * t] + (e[1 + 2 * t] << 8)
  }
  return r % 2 && (n.data[t++] = e[r - 1]), n.size = t, n
}

function mpToByteArray(e) {
  var n = [],
    t = 0,
    r = e.size;
  for (t = 0; r > t; t++) {
    n[2 * t] = 255 & e.data[t];
    var o = e.data[t] >>> 8;
    n[2 * t + 1] = o
  }
  return n
}

function modularExp(e, n, t) {
  for (var r = [], o = 0; n > 0;) {
    r[o] = 1 & n, n >>>= 1, o++
  }
  for (var a = duplicateMP(e), i = o - 2; i >= 0; i--) {
    a = modularMultiply(a, a, t), 1 == r[i] && (a = modularMultiply(a, e, t))
  }
  return a
}

function modularMultiply(e, n, t) {
  var r = multiplyMP(e, n),
    o = divideMP(r, t);
  return o.r
}

function multiplyMP(e, n) {
  var t = new JSMPnumber;
  t.size = e.size + n.size;
  var r, o;
  for (r = 0; r < t.size; r++) {
    t.data[r] = 0
  }
  var a = e.data,
    i = n.data,
    s = t.data;
  if (e == n) {
    for (r = 0; r < e.size; r++) {
      s[2 * r] += a[r] * a[r]
    }
    for (r = 1; r < e.size; r++) {
      for (o = 0; r > o; o++) {
        s[r + o] += 2 * a[r] * a[o]
      }
    }
  } else {
    for (r = 0; r < e.size; r++) {
      for (o = 0; o < n.size; o++) {
        s[r + o] += a[r] * i[o]
      }
    }
  }
  return normalizeJSMP(t), t
}

function normalizeJSMP(e) {
  var n, t, r, o, a;
  for (r = e.size, t = 0, n = 0; r > n; n++) {
    o = e.data[n], o += t, a = o, t = Math.floor(o / 65536), o -= 65536 * t, e.data[n] = o
  }
}

function removeLeadingZeroes(e) {
  for (var n = e.size - 1; n > 0 && 0 == e.data[n--];) {
    e.size--
  }
}

function divideMP(e, n) {
  var t = e.size,
    r = n.size,
    o = n.data[r - 1],
    a = n.data[r - 1] + n.data[r - 2] / 65536,
    i = new JSMPnumber;
  i.size = t - r + 1, e.data[t] = 0;
  for (var s = t - 1; s >= r - 1; s--) {
    var l = s - r + 1,
      c = Math.floor((65536 * e.data[s + 1] + e.data[s]) / a);
    if (c > 0) {
      var u = multiplyAndSubtract(e, c, n, l);
      for (0 > u && (c--, multiplyAndSubtract(e, c, n, l)); u > 0 && e.data[s] >= o;) {
        u = multiplyAndSubtract(e, 1, n, l), u > 0 && c++
      }
    }
    i.data[l] = c
  }
  removeLeadingZeroes(e);
  var d = {
    "q": i,
    "r": e
  };
  return d
}

function multiplyAndSubtract(e, n, t, r) {
  var o, a = e.data.slice(0),
    i = 0,
    s = e.data;
  for (o = 0; o < t.size; o++) {
    var l = i + t.data[o] * n;
    i = l >>> 16, l -= 65536 * i, l > s[o + r] ? (s[o + r] += 65536 - l, i++) : s[o + r] -= l
  }
  return i > 0 && (s[o + r] -= i), s[o + r] < 0 ? (e.data = a.slice(0), -1) : 1
}

function applyPKCSv2Padding(e, n, t) {
  var r, o = e.length,
    a = [218, 57, 163, 238, 94, 107, 75, 13, 50, 85, 191, 239, 149, 96, 24, 144, 175, 216, 7, 9],
    i = n - o - 40 - 2,
    s = [];
  for (r = 0; i > r; r++) {
    s[r] = 0
  }
  s[i] = 1;
  var l = a.concat(s, e),
    c = [];
  for (r = 0; 20 > r; r++) {
    c[r] = Math.floor(256 * Math.random())
  }
  c = SHA1(c.concat(t));
  var u = MGF(c, n - 21),
    d = XORarrays(l, u),
    p = MGF(d, 20),
    f = XORarrays(c, p),
    v = [];
  for (v[0] = 0, v = v.concat(f, d), r = 0; r < v.length; r++) {
    e[r] = v[r]
  }
}

function MGF(e, n) {
  if (n > 4096) {
    return null
  }
  var t = e.slice(0),
    r = t.length;
  t[r++] = 0, t[r++] = 0, t[r++] = 0, t[r] = 0;
  for (var o = 0, a = []; a.length < n;) {
    t[r] = o++, a = a.concat(SHA1(t))
  }
  return a.slice(0, n)
}

function XORarrays(e, n) {
  if (e.length != n.length) {
    return null
  }
  for (var t = [], r = e.length, o = 0; r > o; o++) {
    t[o] = e[o] ^ n[o]
  }
  return t
}

function SHA1(e) {
  var n, t = e.slice(0);
  PadSHA1Input(t);
  var r = {
    "A": 1732584193,
    "B": 4023233417,
    "C": 2562383102,
    "D": 271733878,
    "E": 3285377520
  };
  for (n = 0; n < t.length; n += 64) {
    SHA1RoundFunction(r, t, n)
  }
  var o = [];
  return wordToBytes(r.A, o, 0), wordToBytes(r.B, o, 4), wordToBytes(r.C, o, 8), wordToBytes(r.D, o, 12), wordToBytes(r.E, o, 16), o
}

function wordToBytes(e, n, t) {
  var r;
  for (r = 3; r >= 0; r--) {
    n[t + r] = 255 & e, e >>>= 8
  }
}

function PadSHA1Input(e) {
  var n, t = e.length,
    r = t,
    o = t % 64,
    a = 55 > o ? 56 : 120;
  for (e[r++] = 128, n = o + 1; a > n; n++) {
    e[r++] = 0
  }
  var i = 8 * t;
  for (n = 1; 8 > n; n++) {
    e[r + 8 - n] = 255 & i, i >>>= 8
  }
}

function SHA1RoundFunction(e, n, t) {
  var r, o, a, i = 1518500249,
    s = 1859775393,
    l = 2400959708,
    c = 3395469782,
    u = [],
    d = e.A,
    p = e.B,
    f = e.C,
    v = e.D,
    g = e.E;
  for (o = 0, a = t; 16 > o; o++, a += 4) {
    u[o] = n[a] << 24 | n[a + 1] << 16 | n[a + 2] << 8 | n[a + 3] << 0
  }
  for (o = 16; 80 > o; o++) {
    u[o] = rotateLeft(u[o - 3] ^ u[o - 8] ^ u[o - 14] ^ u[o - 16], 1)
  }
  var m;
  for (r = 0; 20 > r; r++) {
    m = rotateLeft(d, 5) + (p & f | ~p & v) + g + u[r] + i & 4294967295, g = v, v = f, f = rotateLeft(p, 30), p = d, d = m
  }
  for (r = 20; 40 > r; r++) {
    m = rotateLeft(d, 5) + (p ^ f ^ v) + g + u[r] + s & 4294967295, g = v, v = f, f = rotateLeft(p, 30), p = d, d = m
  }
  for (r = 40; 60 > r; r++) {
    m = rotateLeft(d, 5) + (p & f | p & v | f & v) + g + u[r] + l & 4294967295, g = v, v = f, f = rotateLeft(p, 30), p = d, d = m
  }
  for (r = 60; 80 > r; r++) {
    m = rotateLeft(d, 5) + (p ^ f ^ v) + g + u[r] + c & 4294967295, g = v, v = f, f = rotateLeft(p, 30), p = d, d = m
  }
  e.A = e.A + d & 4294967295, e.B = e.B + p & 4294967295, e.C = e.C + f & 4294967295, e.D = e.D + v & 4294967295, e.E = e.E + g & 4294967295
}

function rotateLeft(e, n) {
  var t = e >>> 32 - n,
    r = (1 << 32 - n) - 1,
    o = e & r;
  return o << n | t
}

function hexStringToMP(e) {
  var n, t, r = Math.ceil(e.length / 4),
    o = new JSMPnumber;
  for (o.size = r, n = 0; r > n; n++) {
    t = e.substr(4 * n, 4), o.data[r - 1 - n] = parseInt(t, 16)
  }
  return o
}

module.exports = Encrypt