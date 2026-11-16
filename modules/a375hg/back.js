/* testimonial-2 — Swiper tabanli musteri yorumu slider'i.
   item: { name, role: {tr,en}, text: {tr,en}, rating (1-5), img } */

function ts2Lang(val) {
  if (val == null) {
    return "";
  }
  if (typeof val === "object") {
    if (val[json.lang] != null) {
      return val[json.lang];
    }
    if (val.tr != null) {
      return val.tr;
    }
    var ts2Keys = Object.keys(val);
    return ts2Keys.length ? (val[ts2Keys[0]] || "") : "";
  }
  return String(val);
}

function ts2Stars(rating) {
  var r = Math.max(0, Math.min(5, Math.round(Number(rating) || 5)));
  var out = "";
  for (var si = 0; si < 5; si++) {
    out += si < r ? "\u2605" : "\u2606";
  }
  return out;
}

var backhtml = "";
var rows = Array.isArray(json.data) ? json.data : [];
for (var ti = 0; ti < rows.length; ti++) {
  var item = rows[ti];
  var name = ts2Lang(item.name);
  var text = ts2Lang(item.text);
  if (!name || !text) {
    continue;
  }
  var role = ts2Lang(item.role);
  var avatarHtml = item.img
    ? '<img src="/img/' + json.id + "/" + item.img + '" alt="' + name + '" loading="lazy" />'
    : name.charAt(0).toUpperCase();
  backhtml +=
    '<div class="swiper-slide modulex-testi2-card">' +
    '<div class="modulex-testi2-stars" aria-label="' + (Number(item.rating) || 5) + '/5">' + ts2Stars(item.rating) + "</div>" +
    '<p class="modulex-testi2-text">' + text + "</p>" +
    '<div class="modulex-testi2-person">' +
    '<div class="modulex-testi2-avatar">' + avatarHtml + "</div>" +
    "<div>" +
    '<div class="modulex-testi2-name">' + name + "</div>" +
    (role ? '<div class="modulex-testi2-role">' + role + "</div>" : "") +
    "</div>" +
    "</div>" +
    "</div>";
}
html = html.replace(/{{html}}/g, backhtml);
