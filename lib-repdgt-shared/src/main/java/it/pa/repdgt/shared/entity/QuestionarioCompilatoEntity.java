package it.pa.repdgt.shared.entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "questionario_compilato")
@Setter
@Getter
public class QuestionarioCompilatoEntity implements Serializable { 
	private static final long serialVersionUID = 4720569058596366321L;

	// corrisponde all'id della collection 'questionarioCompilato'
	@Id
	@Column(name = "ID")
	private String id;
	
	@Column(name = "QUESTIONARIO_TEMPLATE_ID")
	private String idQuestionarioTemplate;

	@OneToOne(optional = false)
	@JoinColumn(name = "ID_CITTADINO", referencedColumnName = "ID")
	private CittadinoEntity cittadino;
	
	@Column(name = "FACILITATORE_ID")
	private String idFacilitatore;

	@Column(name = "SEDE_ID")
	private Long idSede;
	
	@Column(name = "ENTE_ID")
	private Long idEnte;
	
	@Column(name = "PROGETTO_ID")
	private Long idProgetto;
	
	@Column(name = "SERVIZIO_ID")
	private Long idServizio;
	
	@Column(name = "STATO")
	private String stato;
	
	@Temporal(value = TemporalType.TIMESTAMP)
	@Column(name = "DATA_ORA_CREAZIONE")
	private Date dataOraCreazione;

	@Temporal(value = TemporalType.TIMESTAMP)
	@Column(name = "DATA_ORA_AGGIORNAMENTO")
	private Date dataOraAggiornamento;
}