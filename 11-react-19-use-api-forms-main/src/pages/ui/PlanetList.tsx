import { useOptimistic, useTransition } from 'react';
import { updatePlanetAction } from '../../actions/update-planet.action';
import { Planet } from '../../interfaces/planet.interface';

interface Props {
  planets: Planet[];
}

export const PlanetList = ({ planets }: Props) => {
  const [isPending, startTransition] = useTransition();

  const [optimisticPlanets, setOptimisticNewPlanets] = useOptimistic(
    planets,
    (current, newPlanet: Planet) => {
      const updatedPlanets = current.map((planet) =>
        planet.id === newPlanet.id ? newPlanet : planet
      );

      return updatedPlanets;
    }
  );

  const handleUpdatePlanet = async (planet: Planet) => {
    startTransition(async () => {
      const data = {
        ...planet,
        name: planet.name.toUpperCase(),
      };

      try {
        setOptimisticNewPlanets(data);
        const updatedPlanet = await updatePlanetAction(data);
        setOptimisticNewPlanets(updatedPlanet);
      } catch (error) {
        console.log(error);
        setOptimisticNewPlanets(planet);
      }
    });
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 animate-fadeIn">
      {optimisticPlanets.map((planet) => (
        <div key={planet.id} className="p-4 bg-gray-100 rounded shadow">
          <h2 className="text-xl font-semibold">{planet.name}</h2>
          <p className="text-gray-700">{planet.type}</p>
          <p className="text-gray-700">{planet.distanceFromSun}</p>

          <br />
          <button
            className="bg-blue-500 disabled:bg-gray-500 text-white p-2 rounded w-full"
            onClick={() => handleUpdatePlanet(planet)}
            disabled={isPending}
          >
            Actualizar
          </button>
        </div>
      ))}
    </div>
  );
};
