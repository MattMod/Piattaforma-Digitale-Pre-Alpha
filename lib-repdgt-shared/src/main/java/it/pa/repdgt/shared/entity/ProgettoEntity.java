package it.pa.repdgt.shared.entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "PROGETTO")
@Setter
@Getter
public class ProgettoEntity implements Serializable {
	private static final long serialVersionUID = 5557015252878732182L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;

	@Column(name = "NOME", nullable = false)
	private String nome;
	
	@Column(name = "NOME_BREVE", nullable = false)
	private String nomeBreve;

	/**
	 * Programma di appartenza di questo (this) progetto
	 * 
	 * */
	@JsonIgnore
	@OneToOne(fetch = FetchType.EAGER, targetEntity = ProgrammaEntity.class)
	@JoinColumn(name = "ID_PROGRAMMA", referencedColumnName = "ID")
	private ProgrammaEntity programma;
	
	/**
	 * L'Ente Gestore di questo (this) programma
	 * 
	 * */
	@JsonIgnore
	@OneToOne(fetch = FetchType.EAGER, targetEntity = EnteEntity.class)
	@JoinColumn(name = "ID_ENTE_GESTORE_PROGETTO", referencedColumnName = "ID")
	private EnteEntity enteGestoreProgetto;
	
	@Column(name = "STATO_GESTORE_PROGETTO")
	private String statoGestoreProgetto;

	@Column(name = "STATO")
	private String stato;
	
	@Temporal(value = TemporalType.TIMESTAMP)
	@Column(name = "DATA_INIZIO_PROGETTO")
	private Date dataInizioProgetto;

	@Temporal(value = TemporalType.TIMESTAMP)
	@Column(name = "DATA_FINE_PROGETTO")
	private Date dataFineProgetto;
	
	@Temporal(value = TemporalType.TIMESTAMP)
	@Column(name = "DATA_ORA_CREAZIONE")
	private Date dataOraCreazione;

	@Temporal(value = TemporalType.TIMESTAMP)
	@Column(name = "DATA_ORA_AGGIORNAMENTO")
	private Date dataOraAggiornamento;
}