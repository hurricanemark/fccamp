DROP DATABASE universe;
CREATE DATABASE universe;
\c universe;

DROP TABLE IF EXISTS galaxy;
CREATE TABLE IF NOT EXISTS galaxy
( galaxy_id SERIAL PRIMARY KEY,
  name VARCHAR(60) UNIQUE NOT NULL,
  classification TEXT DEFAULT 'Spiral',
  number_of_star_systems INT,
  warp_capable_civilizations INT,
  colonized_by_humanoids BOOLEAN,
  indigenous_non_humanoid BOOLEAN,
  waring_factions NUMERIC
);

/* one-to-many */
/* type of stars: Solar, Hot_blue, Red_dwaft, Red_giant, White_dwaft, Neutron */
DROP TABLE IF EXISTS star;
CREATE TABLE IF NOT EXISTS star
( star_id SERIAL PRIMARY KEY,
  name VARCHAR(60) UNIQUE NOT NULL,
  classification TEXT DEFAULT 'Solar',
  part_of_globular_cluster BOOLEAN,
  part_of_open_cluster BOOLEAN,
  planets INT,
  commets INT,
  asteroids NUMERIC,
  galaxy_id INT
);
/*ALTER TABLE star ADD CONSTRAINT star_id_fkey FOREIGN KEY (star_id) REFERENCES galaxy(galaxy_id);*/
ALTER TABLE ONLY public.star ADD CONSTRAINT star_name_key FOREIGN KEY (galaxy_id) REFERENCES public.galaxy(galaxy_id);

/* one-to-many */
/* type of planets: rocky, terrestrial, gasious, ice */
DROP TABLE IF EXISTS planet;
CREATE TABLE IF NOT EXISTS planet
( planet_id SERIAL PRIMARY KEY,
  name VARCHAR(60) UNIQUE NOT NULL,
  classification TEXT DEFAULT 'exo',
  goldilock_zone BOOLEAN,
  atmosphere BOOLEAN,
  rings INT,
  magnetosphere INT,
  oceans NUMERIC,
  star_id INT
);
/*ALTER TABLE planet ADD CONSTRAINT planet_id_fkey FOREIGN KEY (planet_id) REFERENCES star(star_id);*/
ALTER TABLE ONLY public.planet ADD CONSTRAINT planet_name_fk FOREIGN KEY (star_id) REFERENCES public.star(star_id);

/* one-to-many */
/* type of moons: rocky, terrestrial, gasious, ice */
DROP TABLE IF EXISTS moon;
CREATE TABLE IF NOT EXISTS moon
( moon_id SERIAL PRIMARY KEY,
  name VARCHAR(60) NOT NULL,
  classification TEXT DEFAULT 'exo',
  geosynchronus BOOLEAN,
  atmosphere BOOLEAN,
  moons INT,
  continents INT,
  oceans INT,
  planet_id INT
);

ALTER TABLE ONLY public.moon ADD CONSTRAINT moon_name_fk FOREIGN KEY (planet_id) REFERENCES public.planet(planet_id);

/*
ALTER TABLE ONLY public.star ADD CONSTRAINT fk FOREIGN KEY (galaxy_id) REFERENCES public.galaxy(galaxy_id);
ALTER TABLE ONLY public.planet ADD CONSTRAINT fk FOREIGN KEY (star_id) REFERENCES public.star(star_id);
ALTER TABLE ONLY public.moon ADD CONSTRAINT fk FOREIGN KEY (planet_id) REFERENCES public.planet(planet_id);
*/

INSERT INTO galaxy(name, classification, number_of_star_systems, warp_capable_civilizations, colonized_by_humanoids, indigenous_non_humanoid, waring_factions) VALUES('Milkyway', 'Spiral', 1210324, 213, True, True, 12),('Canis Major Dwarf', 'Spiral', 430034000, 12192, False, True, 25),('Cygnus A', 'Spiral', 92837452, 192, True, True, 9225),('Maffei I', 'Spiral', 7452, 192, True, False, 1223),('Maffei I I', 'Spial', 7123452, 92, True, True, 233);

/*
galaxies
Andromeda Galaxy
Canis Major Dwarf Galaxy
Cygnus A
Maffei I and II
Magellanic Clouds
Milky Way Galaxy
Virgo A
galaxy groups and clusters
Coma cluster
Local Group
M81 group
Virgo cluster
*/
