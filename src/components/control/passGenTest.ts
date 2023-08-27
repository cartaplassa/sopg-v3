export default function testGeneratePassword(): string {
  const chars = Math.floor(Math.random() * 4);
  const length = (3 - chars) * 8 + Math.floor(Math.random() * 5) + 8;
  var mask = "";
  switch (chars) {
    // @ts-ignore
    case 0:
      mask += "~`!@#$%^&*()_+-={}[]:\";'<>?,./|\\";
    // @ts-ignore
    case 1:
      mask += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    // @ts-ignore
    case 2:
      mask += "abcdefghijklmnopqrstuvwxyz";
    case 3:
      mask += "0123456789";
  }
  var result = "";
  for (var i = length; i > 0; --i)
    result += mask[Math.floor(Math.random() * mask.length)];
  return result;
}
