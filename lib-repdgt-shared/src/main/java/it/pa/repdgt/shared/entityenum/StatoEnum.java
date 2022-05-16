package it.pa.repdgt.shared.entityenum;

import lombok.Getter;

@Getter
public enum StatoEnum {
	 ATTIVO("ATTIVO")
	,ATTIVABILE("ATTIVABILE")
	,NON_ATTIVO("NON ATTIVO")
	,TERMINATO("TERMINATO")
	,CANCELLATO("CANCELLATO")
	;
	
	private String value;
	
	private StatoEnum(String value) {
		this.value = value;
	}
}