package it.pa.repdgt.gestioneutente.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import it.pa.repdgt.shared.entity.RuoloEntity;

@Repository
public interface RuoloRepository extends JpaRepository<RuoloEntity, String> {

	Optional<RuoloEntity> findByNome(String nome);

	Optional<RuoloEntity> findByCodice(String codiceRuolo);
	
	@Query(value = " SELECT "
				 + "	uxr.RUOLO_CODICE "
				 + " FROM "
				 + "	UTENTE_X_RUOLO uxr "
				 + " WHERE 1=1 "
				 + "   AND uxr.UTENTE_ID = :codiceFiscale",
			nativeQuery = true)
	List<String> findRuoloByCodiceFiscaleUtente(@Param(value = "codiceFiscale") String codiceFiscale);

	@Query(value = "SELECT "
				 + "	ruolo "
				 + " FROM "
				 + "	RuoloEntity ruolo"
				 + " WHERE "
				 + "	ruolo.predefinito = true")
	List<RuoloEntity> findAllRuoliPredefiniti();
	
	@Query(value = "SELECT "
				 + "	ruolo "
				 + " FROM "
				 + "	RuoloEntity ruolo"
				 + " WHERE "
				 + "	ruolo.predefinito = false")
	List<RuoloEntity> findAllRuoliNonPredefiniti();

	@Query(value = "SELECT * "
			+ "FROM RUOLO ruolo "
			+ "	INNER JOIN UTENTE_X_RUOLO uxr "
			+ "		ON uxr.RUOLO_CODICE = ruolo.CODICE "
			+ "WHERE uxr.UTENTE_ID = :cfUtente ",
			nativeQuery = true)
	List<RuoloEntity> findRuoloCompletoByCodiceFiscaleUtente(@Param(value = "cfUtente") String cfUtente);
}