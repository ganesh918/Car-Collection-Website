import fs from 'fs'

const path = 'src/data/cars.js'
let s = fs.readFileSync(path, 'utf8')

const map = [
  ['photo-1618843479313-40f8afb4b4d8', 'carImages.luxury1'],
  ['photo-1617531653332-bd46c24f2068', 'carImages.luxury2'],
  ['photo-1606664515524-ed2f786a0bd6', 'carImages.luxury3'],
  ['photo-1555215695-3004980ad54e', 'carImages.sports1'],
  ['photo-1617814076367-b759a7e6d0f9', 'carImages.sports2'],
  ['photo-1503376780353-7e6692767b70', 'carImages.porsche'],
  ['photo-1614200187524-dc4e28911307', 'carImages.electricGt'],
  ['photo-1544636331-e26879cd4d9b', 'carImages.lamborghini'],
  ['photo-1583121274602-3e2820c69888', 'carImages.ferrari'],
  ['photo-1492144534655-ae79c964c9d7', 'carImages.supercar1'],
  ['photo-1519641471654-76ce0107a1b0', 'carImages.suv1'],
]

s = s.replace(/\$\{'REMOVE'\}/g, 'carImages.electricGt')

const unsplashRe = /'https:\/\/images\.unsplash\.com\/[^']+'/g
s = s.replace(unsplashRe, (match) => {
  for (const [id, ref] of map) {
    if (match.includes(id)) return ref
  }
  return 'carImages.luxury1'
})

fs.writeFileSync(path, s)
console.log('Updated', path)
