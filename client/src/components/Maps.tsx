import React from "react";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import { useFetch } from "../components/hooks/useFetch";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Maps = () => {
  const { data: pharmacies, loading } = useFetch(
    "http://localhost:5000/Pharmacies"
  );

  return (
    <div className="flex justify-center">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <YMaps
            query={{
              ns: "use-load-option",
              load: "Map,Placemark,control.ZoomControl,control.FullscreenControl,geoObject.addon.balloon",
            }}
          >
            <Map
              defaultState={{
                center: [53.901329, 27.559783],
                zoom: 15,
                controls: ["zoomControl", "fullscreenControl"],
              }}
              width="900px"
              height="500px"
            >
              {pharmacies.map((pharmacy, index) => (
                <Placemark
                  key={index}
                  geometry={[pharmacy.latitude, pharmacy.longitude]}
                  properties={{
                    balloonContentBody: `
                      <div>
                        <h3 class="text-lg font-semibold">${pharmacy.pharmaciesName}</h3>
                        <p><strong>Адрес:</strong> ${pharmacy.address}</p>
                        <p><strong>Время работы:</strong> ${pharmacy.workingHours}</p>
                      </div>
                    `,
                  }}
                  options={{
                    iconImageSize: [15, 15],
                    preset: "islands#redDotIcon",
                  }}
                />
              ))}
            </Map>
          </YMaps>
        </div>
      )}
    </div>
  );
};

export default Maps;
