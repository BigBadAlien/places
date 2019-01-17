import LatLngLiteral = google.maps.LatLngLiteral;

export interface MarkerData {
  title: string,
  position: LatLngLiteral,
  color: string;
}
