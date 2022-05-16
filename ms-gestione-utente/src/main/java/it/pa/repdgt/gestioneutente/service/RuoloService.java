package it.pa.repdgt.gestioneutente.service;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import it.pa.repdgt.gestioneutente.annotation.LogExecutionTime;
import it.pa.repdgt.gestioneutente.annotation.LogMethod;
import it.pa.repdgt.gestioneutente.exception.ResourceNotFoundException;
import it.pa.repdgt.gestioneutente.exception.RuoloException;
import it.pa.repdgt.gestioneutente.repository.RuoloRepository;
import it.pa.repdgt.gestioneutente.request.NuovoRuoloRequest;
import it.pa.repdgt.shared.constants.TipologiaRuoloConstants;
import it.pa.repdgt.shared.entity.GruppoEntity;
import it.pa.repdgt.shared.entity.RuoloEntity;

@Service
public class RuoloService {
	@Autowired
	private GruppoService gruppoService;
	@Autowired
	private RuoloRepository ruoloRepository;
	
	@LogExecutionTime
	@LogMethod
	private List<RuoloEntity> getAllRuoli() {
		return this.ruoloRepository.findAll();
	}
	
	@LogExecutionTime
	@LogMethod
	public List<RuoloEntity> getRuoliByTipologiaRuolo(String tipologiaRuolo) {
		if(tipologiaRuolo == null) {
			return this.getAllRuoli();
		}
		
		tipologiaRuolo = tipologiaRuolo.trim().toUpperCase();
		if(!TipologiaRuoloConstants.LISTA_TIPOLOGIA_RUOLI.contains(tipologiaRuolo)) {
			throw new RuoloException("Tipologia ruolo non presente");
		}
		
		if(tipologiaRuolo.equalsIgnoreCase(TipologiaRuoloConstants.PREDEFINITO)) {
			return this.ruoloRepository.findAllRuoliPredefiniti();
		} 
		
		return this.ruoloRepository.findAllRuoliNonPredefiniti();
	}
	

	@LogExecutionTime
	@LogMethod
	public RuoloEntity getRuoloByCodice(String codiceRuolo) {
		String messaggioErrore = String.format("Ruolo con codice = %s non trovato", codiceRuolo);
		return this.ruoloRepository.findById(codiceRuolo)
				.orElseThrow( () -> new ResourceNotFoundException(messaggioErrore));
	}
	
	@LogMethod
	@LogExecutionTime
	public boolean esisteRuoloByCodice(String codiceRuolo) {
		return this.ruoloRepository.findByCodice(codiceRuolo).isPresent();
	}
	
	@LogMethod
	@LogExecutionTime
	public RuoloEntity getRuoloByNome(String nomeRuolo) {
		String messaggioErrore = String.format("Ruolo con nome = %s non trovato", nomeRuolo);
		return this.ruoloRepository.findByNome(nomeRuolo)
				.orElseThrow( () -> new ResourceNotFoundException(messaggioErrore));
	}

	@LogExecutionTime
	@LogMethod
	public boolean existsRuoloByNome(String nomeRuolo) {
		return this.ruoloRepository.findById(nomeRuolo).isPresent();
	}
	
	@LogExecutionTime
	@LogMethod
	public List<GruppoEntity> getGruppByRuolo(String codiceRuolo){
		if(!this.esisteRuoloByCodice(codiceRuolo)) {
			String messaggioErrore = String.format("Il ruolo %s non esiste", codiceRuolo);
			throw new ResourceNotFoundException(messaggioErrore);
		}
		return this.gruppoService.getGruppiByRuolo(codiceRuolo);
	}

	@LogExecutionTime
	@LogMethod
	public void creaNuovoRuolo(NuovoRuoloRequest nuovoRuoloRequest) {
		String nomeRuolo = nuovoRuoloRequest.getNomeRuolo();
		String messaggioErrore = String.format("Ruolo con nome = %s già presente", nomeRuolo);
		if(this.existsRuoloByNome(nomeRuolo)) {
			throw new RuntimeException(messaggioErrore);
		}
		RuoloEntity nuovoRuolo = new RuoloEntity();
		nuovoRuolo.setCodice(nomeRuolo);
		nuovoRuolo.setNome(nomeRuolo);
		this.aggiungiGruppiAlRuolo(nuovoRuoloRequest.getCodiciGruppi(), nuovoRuolo);
		this.ruoloRepository.save(nuovoRuolo);
	}
	
	public void aggiungiGruppiAlRuolo(List<String> codiciGruppi, RuoloEntity ruolo) {
		List<GruppoEntity> gruppi = this.gruppoService.getGruppiByCodiciGruppi(codiciGruppi);
		if(gruppi != null) {
			gruppi.forEach(ruolo::aggiungiGruppo);
		}
	}
	

	public void aggiornaRuolo(String codiceRuolo, NuovoRuoloRequest ruoloRequest) {
		RuoloEntity ruoloFetch = this.getRuoloByCodice(codiceRuolo);
		ruoloFetch.setNome(ruoloRequest.getNomeRuolo());
		List<GruppoEntity> gruppi = ruoloRequest.getCodiciGruppi()
													.stream()
													.map(gruppoService::getGruppoByCodice)
													.collect(Collectors.toList());
		ruoloFetch.setGruppi(gruppi);
		this.ruoloRepository.save(ruoloFetch);
	}

	public void cancellazioneLogicaRuolo(String codiceRuolo) {
		RuoloEntity ruoloFetch = this.getRuoloByCodice(codiceRuolo);
		this.ruoloRepository.save(ruoloFetch);
	}
	
    public List<String> getRuoliByCodiceFiscaleUtente(String codiceFiscale) {
		return this.ruoloRepository.findRuoloByCodiceFiscaleUtente(codiceFiscale);
    }

	public List<RuoloEntity> getRuoliCompletiByCodiceFiscaleUtente(String cfUtente) {
		return this.ruoloRepository.findRuoloCompletoByCodiceFiscaleUtente(cfUtente);
	}

	public List<RuoloEntity> getRuoliByFiltroDiRicerca(String nomeRuolo) {
		
		if(nomeRuolo == null || nomeRuolo.trim().isEmpty()){
			return this.getAllRuoli();
		}
		return Arrays.asList( this.getRuoloByNome(nomeRuolo.trim().toUpperCase()) );
	}
}