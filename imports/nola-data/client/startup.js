export default function startupNolaDataClient() {
  Mapbox.load({
    plugins: ['heat', 'label']
  });
}
