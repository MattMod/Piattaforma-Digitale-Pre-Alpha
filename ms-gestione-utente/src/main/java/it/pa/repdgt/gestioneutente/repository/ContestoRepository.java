package it.pa.repdgt.gestioneutente.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import it.pa.repdgt.gestioneutente.entity.projection.ProgettoEnteProjection;
import it.pa.repdgt.gestioneutente.entity.projection.ProgettoEnteSedeProjection;
import it.pa.repdgt.shared.entity.ProgrammaEntity;

@Repository
public interface ContestoRepository extends JpaRepository<ProgrammaEntity, Long> {

	@Query(value = "SELECT p.* "
			+ "FROM referente_delegati_gestore_programma rdgp "
			+ "INNER JOIN programma p "
			+ "on rdgp.id_programma = p.id "
			+ "WHERE rdgp.cf_utente = :codiceFiscale "
			+ "AND rdgp.codice_ruolo = 'REG'", nativeQuery = true)
	List<ProgrammaEntity> findProgrammiREG(String codiceFiscale);
	
	@Query(value = "SELECT p.* "
			+ "FROM referente_delegati_gestore_programma rdgp "
			+ "INNER JOIN programma p "
			+ "on rdgp.id_programma = p.id "
			+ "WHERE rdgp.cf_utente = :codiceFiscale "
			+ "AND rdgp.codice_ruolo = 'DEG'", nativeQuery = true)
	List<ProgrammaEntity> findProgrammiDEG(String codiceFiscale);
	
	@Query(value = "SELECT DISTINCT p.* "
			+ "FROM referente_delegati_gestore_progetto rdgp "
			+ "INNER JOIN progetto pr "
			+ "on rdgp.id_progetto = pr.id "
			+ "INNER JOIN programma p "
			+ "on pr.id_programma = p.id "
			+ "WHERE rdgp.cf_utente = :codiceFiscale "
			+ "AND rdgp.codice_ruolo = 'REGP'", nativeQuery = true)
	List<ProgrammaEntity> findProgrammiREGP(String codiceFiscale);
	
	@Query(value = "SELECT DISTINCT p.* "
			+ "FROM referente_delegati_gestore_progetto rdgp "
			+ "INNER JOIN progetto pr "
			+ "on rdgp.id_progetto = pr.id "
			+ "INNER JOIN programma p "
			+ "on pr.id_programma = p.id "
			+ "WHERE rdgp.cf_utente = :codiceFiscale "
			+ "AND rdgp.codice_ruolo = 'DEGP'", nativeQuery = true)
	List<ProgrammaEntity> findProgrammiDEGP(String codiceFiscale);
	
	@Query(value = "SELECT DISTINCT p.* "
			+ "FROM referente_delegati_partner rdp "
			+ "INNER JOIN progetto pr "
			+ "on rdp.id_progetto = pr.id "
			+ "INNER JOIN programma p "
			+ "on pr.id_programma = p.id "
			+ "WHERE rdp.cf_utente = :codiceFiscale "
			+ "AND rdp.codice_ruolo = 'REPP'", nativeQuery = true)
	List<ProgrammaEntity> findProgrammiREPP(String codiceFiscale);
	
	@Query(value = "SELECT DISTINCT p.* "
			+ "FROM referente_delegati_partner rdp "
			+ "INNER JOIN progetto pr "
			+ "on rdp.id_progetto = pr.id "
			+ "INNER JOIN programma p "
			+ "on pr.id_programma = p.id "
			+ "WHERE rdp.cf_utente = :codiceFiscale "
			+ "AND rdp.codice_ruolo = 'DEPP'", nativeQuery = true)
	List<ProgrammaEntity> findProgrammiDEPP(String codiceFiscale);
	
	@Query(value = "SELECT DISTINCT p.* "
			+ "FROM PROGETTO pr "
			+ "INNER JOIN programma p "
			+ "on pr.id_programma = p.id "
			+ "WHERE pr.ID in (:listaProgettiPerFacilitatore)", nativeQuery = true)
	List<ProgrammaEntity> findProgrammiFacVol(List<Long> listaProgettiPerFacilitatore);
	
	@Transactional
	@Modifying
	@Query(value = "UPDATE programma "
			+ "SET STATO = 'ATTIVO', "
			+ "DATA_ORA_AGGIORNAMENTO = CURRENT_TIMESTAMP "
			+ "WHERE ID = :idProgramma", nativeQuery = true)
	void updateStatoProgrammaToAttivo(Long idProgramma);
	
	@Transactional
	@Modifying
	@Query(value = "UPDATE programma "
			+ "SET STATO_GESTORE_PROGRAMMA = 'ATTIVO', "
			+ "DATA_ORA_AGGIORNAMENTO = CURRENT_TIMESTAMP "
			+ "WHERE ID = :idProgramma", nativeQuery = true)
	void updateStatoGestoreProgrammaToAttivo(Long idProgramma);
	
	@Transactional
	@Modifying
	@Query(value = "UPDATE PROGETTO "
			+ "SET STATO = 'ATTIVABILE' ,"
			+ "DATA_ORA_AGGIORNAMENTO = CURRENT_TIMESTAMP "
			+ "WHERE ID in (SELECT distinct p.id "
			+ "FROM PROGETTO p "
			+ "INNER JOIN ENTE_SEDE_PROGETTO_FACILITATORE espf "
			+ "ON p.ID = espf.ID_PROGETTO "
			+ "WHERE p.id_programma = :idProgramma "
			+ "AND p.STATO = 'NON ATTIVO')", nativeQuery = true)
	void rendiProgettiAttivabili(Long idProgramma);
	
	@Transactional
	@Modifying
	@Query(value = "UPDATE PROGETTO "
			+ "SET STATO_GESTORE_PROGETTO = 'ATTIVO', "
			+ "DATA_ORA_AGGIORNAMENTO = CURRENT_TIMESTAMP "
			+ "WHERE ID in (SELECT distinct p.id "
			+ "FROM PROGETTO p "
			+ "INNER JOIN REFERENTE_DELEGATI_GESTORE_PROGETTO rdgp "
			+ "ON p.ID = rdgp.ID_PROGETTO "
			+ "WHERE p.id_programma = :idProgramma "
			+ "AND STATO_GESTORE_PROGETTO = 'NON ATTIVO'"
			+ "AND CF_UTENTE = :codiceFiscale "
			+ "AND CODICE_RUOLO = :ruolo)", nativeQuery = true)
	void updateStatoGestoreProgettoInAttivo(Long idProgramma, String codiceFiscale, String ruolo);
	
	@Query(value = "SELECT distinct ep.ID_PROGETTO as idProgetto, ep.ID_ENTE as idEnte, ep.STATO_ENTE_PARTNER as stato "
			+ "		FROM PROGETTO p "
			+ "		INNER JOIN ENTE_PARTNER ep "
			+ "		on p.ID = ep.ID_PROGETTO "
			+ "		INNER JOIN REFERENTE_DELEGATI_PARTNER  rdp "
			+ "		ON ep.ID_PROGETTO = rdp.ID_PROGETTO "
			+ "		AND ep.ID_ENTE = rdp.ID_ENTE"
			+ "		WHERE p.id_programma = :idProgramma "
			+ "		AND rdp.CF_UTENTE = :codiceFiscale "
			+ "		AND rdp.CODICE_RUOLO = :ruolo", nativeQuery = true)
	List<ProgettoEnteProjection> findEntiPartnerNonAttiviPerProgrammaECodiceFiscaleReferenteDelegato(Long idProgramma, String codiceFiscale, String ruolo);
	
	@Transactional
	@Modifying
	@Query(value = "UPDATE ENTE_PARTNER "
			+ "SET STATO_ENTE_PARTNER = 'ATTIVO', "
			+ "DATA_ORA_AGGIORNAMENTO = CURRENT_TIMESTAMP "
			+ "WHERE ID_PROGETTO = :idProgetto "
			+ "AND ID_ENTE = :idEnte", nativeQuery = true)
	void updateStatoEntePartnerProgettoToAttivo(Long idProgetto, Long idEnte);
	
	@Query(value = "select esp.id_ente as idEnte, esp.id_sede as idSede, esp.id_progetto as idProgetto, esp.stato_sede as stato "
			+ "from ente_sede_progetto_facilitatore espf "
			+ "INNER JOIN ente_sede_progetto esp "
			+ "ON espf.id_progetto = esp.ID_PROGETTO "
			+ "AND espf.id_ente = esp.ID_ente "
			+ "AND espf.id_sede = esp.id_sede "
			+ "where espf.id_progetto in (select id from PROGETTO where id_programma = :idProgramma) "
			+ "and espf.ID_FACILITATORE = :codiceFiscale "
			+ "and espf.RUOLO_UTENTE = :ruolo ", nativeQuery = true)
	List<ProgettoEnteSedeProjection> findSediPerProgrammaECodiceFiscaleFacilitatoreVolontario(Long idProgramma, String codiceFiscale, String ruolo);
	
	@Transactional
	@Modifying
	@Query(value = "UPDATE ENTE_SEDE_PROGETTO "
			+ "SET STATO_SEDE = 'ATTIVO', "
			+ "DATA_ORA_AGGIORNAMENTO = CURRENT_TIMESTAMP "
			+ "WHERE ID_PROGETTO = :idProgetto "
			+ "AND ID_ENTE = :idEnte "
			+ "AND ID_SEDE = :idSede", nativeQuery = true)
	void updateStatoSedeProgettoToAttivo(Long idProgetto, Long idEnte, Long idSede);
	
	@Transactional
	@Modifying
	@Query(value = "UPDATE REFERENTE_DELEGATI_GESTORE_PROGRAMMA "
			+ "SET STATO_UTENTE = 'ATTIVO', "
			+ "DATA_ORA_AGGIORNAMENTO = CURRENT_TIMESTAMP "
			+ "WHERE ID_PROGRAMMA = :idProgramma "
			+ "AND CF_UTENTE = :codiceFiscale "
			+ "AND CODICE_RUOLO = :codiceRuolo", nativeQuery = true)
	void attivaREGDEG(Long idProgramma, String codiceFiscale, String codiceRuolo);
	
	@Transactional
	@Modifying
	@Query(value = "UPDATE REFERENTE_DELEGATI_GESTORE_PROGETTO "
			+ "SET STATO_UTENTE = 'ATTIVO', "
			+ "DATA_ORA_AGGIORNAMENTO = CURRENT_TIMESTAMP "
			+ "WHERE ID_PROGETTO in ( SELECT ID FROM PROGETTO WHERE ID_PROGRAMMA = :idProgramma)  "
			+ "AND CF_UTENTE = :codiceFiscale "
			+ "AND CODICE_RUOLO = :codiceRuolo", nativeQuery = true)
	void attivaREGPDEGP(Long idProgramma, String codiceFiscale, String codiceRuolo);
	
	@Transactional
	@Modifying
	@Query(value = "UPDATE REFERENTE_DELEGATI_PARTNER "
			+ "SET STATO_UTENTE = 'ATTIVO', "
			+ "DATA_ORA_AGGIORNAMENTO = CURRENT_TIMESTAMP "
			+ "WHERE ID_PROGETTO = :idProgetto "
			+ "AND ID_ENTE = :idEnte "
			+ "AND CF_UTENTE = :codiceFiscale "
			+ "AND CODICE_RUOLO = :codiceRuolo", nativeQuery = true)
	void attivaREPPDEPP(Long idProgetto, Long idEnte, String codiceFiscale, String codiceRuolo);
	
	@Transactional
	@Modifying
	@Query(value = "UPDATE ENTE_SEDE_PROGETTO_FACILITATORE "
			+ "SET STATO_UTENTE = 'ATTIVO', "
			+ "DATA_ORA_AGGIORNAMENTO = CURRENT_TIMESTAMP "
			+ "WHERE ID_PROGETTO = :idProgetto "
			+ "AND ID_ENTE = :idEnte "
			+ "AND ID_SEDE = :idSede "
			+ "AND ID_FACILITATORE = :codiceFiscale "
			+ "AND ruolo_utente = :codiceRuolo", nativeQuery = true)
	void attivaFACVOL(Long idProgetto, Long idEnte, Long idSede, String codiceFiscale, String codiceRuolo);
}