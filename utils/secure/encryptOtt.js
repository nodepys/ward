var Key = "e=10001;m=a67c3d83918266494b10732e558006472d46a42d2423b1ddc92c6760e751bf45cceb75ce051bed28be809f737a601dc5875cc4462baae2bc31cb80b70f3d73fd737852a93925d888c874eae9df23b9068eea15770cd99ef419e54ababd72e89fe1e9b9100786100f349d208261fbe16c3ddec6bc9d927632b83b0e4e7a268747f37b9274251b793e95ccd1052787e600dab5f02dd3ab02fb0e5c827fc9dc3f1414f8e3aa21aeb0921498f3d22122b057c003095d5cf4531abd6978a8b3661b92c7081fa0058cfc548c828c76fa39ebea1ee05a5ffd04e596331de7b50eea9dfab23fb7ed21dabf3db87ff7bf5d36883b12207404740d71647b98d0180b48b5f5"; var randomNum = "F1C0543607F09D6DF7408E957D4821AFA2FF1B6B55D9008F73F21F250F74708D95DDBCDB26EF8DE7F78078504AD9F3EB82E2755637CE562BE770EAE33299C5DB14382F5B2A3E7C5451DD14ADC78B263A52C63C9D81CF8219FDF03013A345515ED21BD872"; var SKI = "25CE4D96CB3A09A69CD847C69FC6D40AF4A4DE12";


function PackageSADataForProof(e) {
  var t, i = [],
    r = 0;
  for (t = 0; t < e.length; t++) {
    i[r++] = 127 & e.charCodeAt(t), i[r++] = (65280 & e.charCodeAt(t)) >> 8
  }
  return i
}

function parseRSAKeyFromString(e) {
  var t = e.indexOf(";");
  if (0 > t) {
    return null
  }
  var i = e.substr(0, t),
    r = e.substr(t + 1),
    n = i.indexOf("=");
  if (0 > n) {
    return null
  }
  var o = i.substr(n + 1);
  if (n = r.indexOf("="), 0 > n) {
    return null
  }
  var s = r.substr(n + 1),
    a = new Object;
  return a.n = hexStringToMP(s), a.e = parseInt(o, 16), a
}
function hexStringToMP(e) {
  var t, i, r = Math.ceil(e.length / 4),
    n = new JSMPnumber;
  for (n.size = r, t = 0; r > t; t++) {
    i = e.substr(4 * t, 4), n.data[r - 1 - t] = parseInt(i, 16)
  }
  return n
}
function JSMPnumber() {
  this.size = 1, this.data = [], this.data[0] = 0
}

function RSAEncrypt(e, t) {
  for (var i = [], r = 42, n = 2 * t.n.size - r, o = 0; o < e.length; o += n) {
    if (o + n >= e.length) {
      var s = RSAEncryptBlock(e.slice(o), t, randomNum);
      s && (i = s.concat(i))
    } else {
      var s = RSAEncryptBlock(e.slice(o, o + n), t, randomNum);
      s && (i = s.concat(i))
    }
  }
  var a = byteArrayToBase64(i);
  return a
}
function RSAEncryptBlock(e, t, i) {
  var r = t.n,
    n = t.e,
    o = e.length,
    s = 2 * r.size,
    a = 42;
  if (o + a > s) {
    return null
  }
  applyPKCSv2Padding(e, s, i), e = e.reverse();
  var l = byteArrayToMP(e),
    d = modularExp(l, n, r);
  d.size = r.size;
  var h = mpToByteArray(d);
  return h = h.reverse()
}
function applyPKCSv2Padding(e, t, i) {
  var r, n = e.length,
    o = [218, 57, 163, 238, 94, 107, 75, 13, 50, 85, 191, 239, 149, 96, 24, 144, 175, 216, 7, 9],
    s = t - n - 40 - 2,
    a = [];
  for (r = 0; s > r; r++) {
    a[r] = 0
  }
  a[s] = 1;
  var l = o.concat(a, e),
    d = [];
  for (r = 0; 20 > r; r++) {
    d[r] = Math.floor(256 * Math.random())
  }
  d = SHA1(d.concat(i));
  var h = MGF(d, t - 21),
    u = XORarrays(l, h),
    c = MGF(u, 20),
    p = XORarrays(d, c),
    f = [];
  for (f[0] = 0, f = f.concat(p, u), r = 0; r < f.length; r++) {
    e[r] = f[r]
  }
}
function MGF(e, t) {
  if (t > 4096) {
    return null
  }
  var i = e.slice(0),
    r = i.length;
  i[r++] = 0, i[r++] = 0, i[r++] = 0, i[r] = 0;
  for (var n = 0, o = []; o.length < t;) {
    i[r] = n++, o = o.concat(SHA1(i))
  }
  return o.slice(0, t)
}
function XORarrays(e, t) {
  if (e.length != t.length) {
    return null
  }
  for (var i = [], r = e.length, n = 0; r > n; n++) {
    i[n] = e[n] ^ t[n]
  }
  return i
}
function PadSHA1Input(e) {
  var t, i = e.length,
    r = i,
    n = i % 64,
    o = 55 > n ? 56 : 120;
  for (e[r++] = 128, t = n + 1; o > t; t++) {
    e[r++] = 0
  }
  var s = 8 * i;
  for (t = 1; 8 > t; t++) {
    e[r + 8 - t] = 255 & s, s >>>= 8
  }
}
function SHA1(e) {
  var t, i = e.slice(0);
  PadSHA1Input(i);
  var r = {
    "A": 1732584193,
    "B": 4023233417,
    "C": 2562383102,
    "D": 271733878,
    "E": 3285377520
  };
  for (t = 0; t < i.length; t += 64) {
    SHA1RoundFunction(r, i, t)
  }
  var n = [];
  return wordToBytes(r.A, n, 0), wordToBytes(r.B, n, 4), wordToBytes(r.C, n, 8), wordToBytes(r.D, n, 12), wordToBytes(r.E, n, 16), n
}
function rotateLeft(e, t) {
  var i = e >>> 32 - t,
    r = (1 << 32 - t) - 1,
    n = e & r;
  return n << t | i
}
function SHA1RoundFunction(e, t, i) {
  var r, n, o, s = 1518500249,
    a = 1859775393,
    l = 2400959708,
    d = 3395469782,
    h = [],
    u = e.A,
    c = e.B,
    p = e.C,
    f = e.D,
    m = e.E;
  for (n = 0, o = i; 16 > n; n++, o += 4) {
    h[n] = t[o] << 24 | t[o + 1] << 16 | t[o + 2] << 8 | t[o + 3] << 0
  }
  for (n = 16; 80 > n; n++) {
    h[n] = rotateLeft(h[n - 3] ^ h[n - 8] ^ h[n - 14] ^ h[n - 16], 1)
  }
  var g;
  for (r = 0; 20 > r; r++) {
    g = rotateLeft(u, 5) + (c & p | ~c & f) + m + h[r] + s & 4294967295, m = f, f = p, p = rotateLeft(c, 30), c = u, u = g
  }
  for (r = 20; 40 > r; r++) {
    g = rotateLeft(u, 5) + (c ^ p ^ f) + m + h[r] + a & 4294967295, m = f, f = p, p = rotateLeft(c, 30), c = u, u = g
  }
  for (r = 40; 60 > r; r++) {
    g = rotateLeft(u, 5) + (c & p | c & f | p & f) + m + h[r] + l & 4294967295, m = f, f = p, p = rotateLeft(c, 30), c = u, u = g
  }
  for (r = 60; 80 > r; r++) {
    g = rotateLeft(u, 5) + (c ^ p ^ f) + m + h[r] + d & 4294967295, m = f, f = p, p = rotateLeft(c, 30), c = u, u = g
  }
  e.A = e.A + u & 4294967295, e.B = e.B + c & 4294967295, e.C = e.C + p & 4294967295, e.D = e.D + f & 4294967295, e.E = e.E + m & 4294967295
}
function wordToBytes(e, t, i) {
  var r;
  for (r = 3; r >= 0; r--) {
    t[i + r] = 255 & e, e >>>= 8
  }
}
function byteArrayToMP(e) {
  var t = new JSMPnumber,
    i = 0,
    r = e.length,
    n = r >> 1;
  for (i = 0; n > i; i++) {
    t.data[i] = e[2 * i] + (e[1 + 2 * i] << 8)
  }
  return r % 2 && (t.data[i++] = e[r - 1]), t.size = i, t
}
function duplicateMP(e) {
  var t = new JSMPnumber;
  return t.size = e.size, t.data = e.data.slice(0), t
}
function multiplyMP(e, t) {
  var i = new JSMPnumber;
  i.size = e.size + t.size;
  var r, n;
  for (r = 0; r < i.size; r++) {
    i.data[r] = 0
  }
  var o = e.data,
    s = t.data,
    a = i.data;
  if (e == t) {
    for (r = 0; r < e.size; r++) {
      a[2 * r] += o[r] * o[r]
    }
    for (r = 1; r < e.size; r++) {
      for (n = 0; r > n; n++) {
        a[r + n] += 2 * o[r] * o[n]
      }
    }
  } else {
    for (r = 0; r < e.size; r++) {
      for (n = 0; n < t.size; n++) {
        a[r + n] += o[r] * s[n]
      }
    }
  }
  return normalizeJSMP(i), i
}

function normalizeJSMP(e) {
  var t, i, r, n, o;
  for (r = e.size, i = 0, t = 0; r > t; t++) {
    n = e.data[t], n += i, o = n, i = Math.floor(n / 65536), n -= 65536 * i, e.data[t] = n
  }
}

function removeLeadingZeroes(e) {
  for (var t = e.size - 1; t > 0 && 0 == e.data[t--];) {
    e.size--
  }
}

function divideMP(e, t) {
  var i = e.size,
    r = t.size,
    n = t.data[r - 1],
    o = t.data[r - 1] + t.data[r - 2] / 65536,
    s = new JSMPnumber;
  s.size = i - r + 1, e.data[i] = 0;
  for (var a = i - 1; a >= r - 1; a--) {
    var l = a - r + 1,
      d = Math.floor((65536 * e.data[a + 1] + e.data[a]) / o);
    if (d > 0) {
      var h = multiplyAndSubtract(e, d, t, l);
      for (0 > h && (d--, multiplyAndSubtract(e, d, t, l)); h > 0 && e.data[a] >= n;) {
        h = multiplyAndSubtract(e, 1, t, l), h > 0 && d++
      }
    }
    s.data[l] = d
  }
  removeLeadingZeroes(e);
  var u = {
    "q": s,
    "r": e
  };
  return u
}

function multiplyAndSubtract(e, t, i, r) {
  var n, o = e.data.slice(0),
    s = 0,
    a = e.data;
  for (n = 0; n < i.size; n++) {
    var l = s + i.data[n] * t;
    s = l >>> 16, l -= 65536 * s, l > a[n + r] ? (a[n + r] += 65536 - l, s++) : a[n + r] -= l
  }
  return s > 0 && (a[n + r] -= s), a[n + r] < 0 ? (e.data = o.slice(0), -1) : 1
}
function base64Encode(e, t) {
  var i, r = "";
  for (i = t; 4 > i; i++) {
    e >>= 6
  }
  for (i = 0; t > i; i++) {
    r = mapByteToBase64(63 & e) + r, e >>= 6
  }
  return r
}
function mapByteToBase64(e) {
  return e >= 0 && 26 > e ? String.fromCharCode(65 + e) : e >= 26 && 52 > e ? String.fromCharCode(97 + e - 26) : e >= 52 && 62 > e ? String.fromCharCode(48 + e - 52) : 62 == e ? "+" : "/"
}
function modularMultiply(e, t, i) {
  var r = multiplyMP(e, t),
    n = divideMP(r, i);
  return n.r
}
function modularExp(e, t, i) {
  for (var r = [], n = 0; t > 0;) {
    r[n] = 1 & t, t >>>= 1, n++
  }
  for (var o = duplicateMP(e), s = n - 2; s >= 0; s--) {
    o = modularMultiply(o, o, i), 1 == r[s] && (o = modularMultiply(o, e, i))
  }
  return o
}
function mpToByteArray(e) {
  var t = [],
    i = 0,
    r = e.size;
  for (i = 0; r > i; i++) {
    t[2 * i] = 255 & e.data[i];
    var n = e.data[i] >>> 8;
    t[2 * i + 1] = n
  }
  return t
}
function byteArrayToBase64(e) {
  var t, i, r = e.length,
    n = "";
  for (t = r - 3; t >= 0; t -= 3) {
    i = e[t] | e[t + 1] << 8 | e[t + 2] << 16, n += base64Encode(i, 4)
  }
  var o = r % 3;
  for (i = 0, t += 2; t >= 0; t--) {
    i = i << 8 | e[t]
  }
  return 1 == o ? n = n + base64Encode(i << 16, 2) + "==" : 2 == o && (n = n + base64Encode(i << 8, 3) + "="), n
}


module.exports = (ott, key = Key, randomnum = randomNum) => {
  let n = PackageSADataForProof(ott)
  let o = parseRSAKeyFromString(key)
  return RSAEncrypt(n, o, randomnum)
}