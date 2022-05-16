package it.pa.repdgt.gestioneutente.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import it.pa.repdgt.shared.entity.EnteSedeProgettoFacilitatoreEntity;
import it.pa.repdgt.shared.entity.key.EnteSedeProgettoFacilitatoreKey;

@Repository
public interface EnteSedeProgettoFacilitatoreRepository extends JpaRepository<EnteSedeProgettoFacilitatoreEntity, EnteSedeProgettoFacilitatoreKey> {
	
	@Query(value = "SELECT DISTINCT espf.ID_PROGETTO "
			+ "		FROM ENTE_SEDE_PROGETTO_FACILITATORE espf "
			+ "		WHERE espf.ID_FACILITATORE = :codiceFiscale"
			+ "		AND RUOLO_UTENTE = :ruolo", nativeQuery = true)
	List<Long> findDistinctProgettiByIdFacilitatore(String codiceFiscale, String ruolo);
}