import { FC, use, useState } from 'react';

import { Planet } from '../interfaces/planet.interface';
import { EditPlanetForm } from './ui/EditPlanetForm';
import { PlanetList } from './ui/PlanetList';
import { createPlanetAction } from '../actions/create-planet.action';

interface Props {
  getPlanets: Promise<Planet[]>;
}

const Planets: FC<Props> = ({ getPlanets }) => {
  const originalPlanets = use(getPlanets);
  const [planets, setPlanets] = useState<Planet[]>(originalPlanets);

  const handleAddPlanet = async (planet: Planet) => {
    // const newPlanet = await createPlanetAction(planet);
    // console.log('éxito!', newPlanet);
    setPlanets([...planets, planet]);
  };

  return (
    <>
      <h4 className="text-2xl font-thin mb-4">Agregar y mantener planetas</h4>
      <hr className="border-gray-300 mb-4" />
      {/* Formulario para agregar un planeta */}
      <EditPlanetForm onAddPlanet={handleAddPlanet} />

      <PlanetList planets={planets} />
    </>
  );
};

export default Planets;
