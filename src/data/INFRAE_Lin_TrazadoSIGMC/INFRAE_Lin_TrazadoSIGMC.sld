<?xml version="1.0" encoding="UTF-8"?>
<StyledLayerDescriptor xmlns="http://www.opengis.net/sld"
                       xmlns:ogc="http://www.opengis.net/ogc"
                       xmlns:xlink="http://www.w3.org/1999/xlink"
                       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                       xsi:schemaLocation="http://www.opengis.net/sld http://schemas.opengis.net/sld/1.0.0/StyledLayerDescriptor.xsd"
                       version="1.0.0">
  <NamedLayer>
    <Name>IDENA_INFRAE_Lin_TrazadoSIGMC</Name>
    <UserStyle>
      <Name>IDENA_INFRAE_Lin_TrazadoSIGMC</Name>
      <Title>IDENA_INFRAE_Lin_TrazadoSIGMC</Title>
      <FeatureTypeStyle>
        <Name>IDENA_INFRAE_Lin_TrazadoSIGMC</Name>
        <!-- INICIO DE REGLAS -->
        <!-- Regla para TIPOVIACIC ABC (Acera bici compartida) -->
        <Rule>
          <Name>ABC (Acera bici compartida)</Name>
          <Title>ABC (Acera bici compartida)</Title>
          <ogc:Filter>
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>TIPOVIACIC</ogc:PropertyName>
              <ogc:Literal>ABC (Acera bici compartida)</ogc:Literal>
            </ogc:PropertyIsEqualTo>
          </ogc:Filter>
          <MinScaleDenominator>1</MinScaleDenominator>
          <MaxScaleDenominator>1000000</MaxScaleDenominator>
          <LineSymbolizer>
            <Stroke>
              <CssParameter name="stroke">#73e1ff</CssParameter>
              <CssParameter name="stroke-width">3</CssParameter>
              <CssParameter name="stroke-linejoin">round</CssParameter>
              <CssParameter name="stroke-linecap">round</CssParameter>
            </Stroke>
          </LineSymbolizer>
        </Rule>
        <!-- Regla para TIPOVIACIC ABD (Acera bici delimitada) -->
        <Rule>
          <Name>ABD (Acera bici delimitada)</Name>
          <Title>ABD (Acera bici delimitada)</Title>
          <ogc:Filter>
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>TIPOVIACIC</ogc:PropertyName>
              <ogc:Literal>ABD (Acera bici delimitada)</ogc:Literal>
            </ogc:PropertyIsEqualTo>
          </ogc:Filter>
          <MinScaleDenominator>1</MinScaleDenominator>
          <MaxScaleDenominator>1000000</MaxScaleDenominator>
          <LineSymbolizer>
            <Stroke>
              <CssParameter name="stroke">#00aae6</CssParameter>
              <CssParameter name="stroke-width">3</CssParameter>
              <CssParameter name="stroke-linejoin">round</CssParameter>
              <CssParameter name="stroke-linecap">round</CssParameter>
            </Stroke>
          </LineSymbolizer>
        </Rule>
        <!-- Regla para TIPOVIACIC BUS (Bici-Bus) -->
        <Rule>
          <Name>BUS (Bici-Bus)</Name>
          <Title>BUS (Bici-Bus)</Title>
          <ogc:Filter>
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>TIPOVIACIC</ogc:PropertyName>
              <ogc:Literal>BUS (Bici-Bus)</ogc:Literal>
            </ogc:PropertyIsEqualTo>
          </ogc:Filter>
          <MinScaleDenominator>1</MinScaleDenominator>
          <MaxScaleDenominator>1000000</MaxScaleDenominator>
          <LineSymbolizer>
            <Stroke>
              <CssParameter name="stroke">#afafaf</CssParameter>
              <CssParameter name="stroke-width">3</CssParameter>
              <CssParameter name="stroke-linejoin">round</CssParameter>
              <CssParameter name="stroke-linecap">round</CssParameter>
            </Stroke>
          </LineSymbolizer>
        </Rule>
        <!-- Regla para TIPOVIACIC CAR (Carretera) -->
        <Rule>
          <Name>CAR (Carretera)</Name>
          <Title>CAR (Carretera)</Title>
          <ogc:Filter>
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>TIPOVIACIC</ogc:PropertyName>
              <ogc:Literal>CAR (Carretera)</ogc:Literal>
            </ogc:PropertyIsEqualTo>
          </ogc:Filter>
          <MinScaleDenominator>1</MinScaleDenominator>
          <MaxScaleDenominator>1000000</MaxScaleDenominator>
          <LineSymbolizer>
            <Stroke>
              <CssParameter name="stroke">#ff0000</CssParameter>
              <CssParameter name="stroke-width">3</CssParameter>
              <CssParameter name="stroke-linejoin">round</CssParameter>
              <CssParameter name="stroke-linecap">round</CssParameter>
            </Stroke>
          </LineSymbolizer>
        </Rule>
        <!-- Regla para TIPOVIACIC CBI (Carril bici) -->
        <Rule>
          <Name>CBI (Carril bici)</Name>
          <Title>CBI (Carril bici)</Title>
          <ogc:Filter>
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>TIPOVIACIC</ogc:PropertyName>
              <ogc:Literal>CBI (Carril bici)</ogc:Literal>
            </ogc:PropertyIsEqualTo>
          </ogc:Filter>
          <MinScaleDenominator>1</MinScaleDenominator>
          <MaxScaleDenominator>1000000</MaxScaleDenominator>
          <LineSymbolizer>
            <Stroke>
              <CssParameter name="stroke">#ffbee6</CssParameter>
              <CssParameter name="stroke-width">3</CssParameter>
              <CssParameter name="stroke-linejoin">round</CssParameter>
              <CssParameter name="stroke-linecap">round</CssParameter>
            </Stroke>
          </LineSymbolizer>
        </Rule>
        <!-- Regla para TIPOVIACIC CBL (Carril bici en plataforma peatonal) -->
        <Rule>
          <Name>CBL (Carril bici en plataforma peatonal)</Name>
          <Title>CBL (Carril bici en plataforma peatonal)</Title>
          <ogc:Filter>
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>TIPOVIACIC</ogc:PropertyName>
              <ogc:Literal>CBL (Carril bici en plataforma peatonal)</ogc:Literal>
            </ogc:PropertyIsEqualTo>
          </ogc:Filter>
          <MinScaleDenominator>1</MinScaleDenominator>
          <MaxScaleDenominator>1000000</MaxScaleDenominator>
          <LineSymbolizer>
            <Stroke>
              <CssParameter name="stroke">#55ff00</CssParameter>
              <CssParameter name="stroke-width">3</CssParameter>
              <CssParameter name="stroke-linejoin">round</CssParameter>
              <CssParameter name="stroke-linecap">round</CssParameter>
            </Stroke>
          </LineSymbolizer>
        </Rule>
        <!-- Regla para TIPOVIACIC CBP (Carril bici protegido) -->
        <Rule>
          <Name>CBP (Carril bici protegido)</Name>
          <Title>CBP (Carril bici protegido)</Title>
          <ogc:Filter>
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>TIPOVIACIC</ogc:PropertyName>
              <ogc:Literal>CBP (Carril bici protegido)</ogc:Literal>
            </ogc:PropertyIsEqualTo>
          </ogc:Filter>
          <MinScaleDenominator>1</MinScaleDenominator>
          <MaxScaleDenominator>1000000</MaxScaleDenominator>
          <LineSymbolizer>
            <Stroke>
              <CssParameter name="stroke">#ff00c8</CssParameter>
              <CssParameter name="stroke-width">3</CssParameter>
              <CssParameter name="stroke-linejoin">round</CssParameter>
              <CssParameter name="stroke-linecap">round</CssParameter>
            </Stroke>
          </LineSymbolizer>
        </Rule>
        <!-- Regla para TIPOVIACIC CCA (Ciclocalle) -->
        <Rule>
          <Name>CCA (Ciclocalle)</Name>
          <Title>CCA (Ciclocalle)</Title>
          <ogc:Filter>
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>TIPOVIACIC</ogc:PropertyName>
              <ogc:Literal>CCA (Ciclocalle)</ogc:Literal>
            </ogc:PropertyIsEqualTo>
          </ogc:Filter>
          <MinScaleDenominator>1</MinScaleDenominator>
          <MaxScaleDenominator>1000000</MaxScaleDenominator>
          <LineSymbolizer>
            <Stroke>
              <CssParameter name="stroke">#dcdcc8</CssParameter>
              <CssParameter name="stroke-width">3</CssParameter>
              <CssParameter name="stroke-linejoin">round</CssParameter>
              <CssParameter name="stroke-linecap">round</CssParameter>
            </Stroke>
          </LineSymbolizer>
        </Rule>
        <!-- Regla para TIPOVIACIC CCL (Ciclocarril) -->
        <Rule>
          <Name>CCL (Ciclocarril)</Name>
          <Title>CCL (Ciclocarril)</Title>
          <ogc:Filter>
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>TIPOVIACIC</ogc:PropertyName>
              <ogc:Literal>CCL (Ciclocarril)</ogc:Literal>
            </ogc:PropertyIsEqualTo>
          </ogc:Filter>
          <MinScaleDenominator>1</MinScaleDenominator>
          <MaxScaleDenominator>1000000</MaxScaleDenominator>
          <LineSymbolizer>
            <Stroke>
              <CssParameter name="stroke">#dcdcc8</CssParameter>
              <CssParameter name="stroke-width">3</CssParameter>
              <CssParameter name="stroke-linejoin">round</CssParameter>
              <CssParameter name="stroke-linecap">round</CssParameter>
            </Stroke>
          </LineSymbolizer>
        </Rule>
        <!-- Regla para TIPOVIACIC CPP (Circulación permitida provisionalmente) -->
        <Rule>
          <Name>CPP (Circulación permitida provisionalmente)</Name>
          <Title>CPP (Circulación permitida provisionalmente)</Title>
          <ogc:Filter>
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>TIPOVIACIC</ogc:PropertyName>
              <ogc:Literal>CPP (Circulación permitida provisionalmente)</ogc:Literal>
            </ogc:PropertyIsEqualTo>
          </ogc:Filter>
          <MinScaleDenominator>1</MinScaleDenominator>
          <MaxScaleDenominator>1000000</MaxScaleDenominator>
          <LineSymbolizer>
            <Stroke>
              <CssParameter name="stroke">#ffebbe</CssParameter>
              <CssParameter name="stroke-width">3</CssParameter>
              <CssParameter name="stroke-linejoin">round</CssParameter>
              <CssParameter name="stroke-linecap">round</CssParameter>
            </Stroke>
          </LineSymbolizer>
        </Rule>
        <!-- Regla para TIPOVIACIC ZRE (Zona residencial) -->
        <Rule>
          <Name>ZRE (Zona residencial)</Name>
          <Title>ZRE (Zona residencial)</Title>
          <ogc:Filter>
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>TIPOVIACIC</ogc:PropertyName>
              <ogc:Literal>ZRE (Zona residencial)</ogc:Literal>
            </ogc:PropertyIsEqualTo>
          </ogc:Filter>
          <MinScaleDenominator>1</MinScaleDenominator>
          <MaxScaleDenominator>1000000</MaxScaleDenominator>
          <LineSymbolizer>
            <Stroke>
              <CssParameter name="stroke">#dc73ff</CssParameter>
              <CssParameter name="stroke-width">3</CssParameter>
              <CssParameter name="stroke-linejoin">round</CssParameter>
              <CssParameter name="stroke-linecap">round</CssParameter>
            </Stroke>
          </LineSymbolizer>
        </Rule>
        <!-- Regla para TIPOVIACIC CRU (Cruce) -->
        <Rule>
          <Name>CRU (Cruce)</Name>
          <Title>CRU (Cruce)</Title>
          <ogc:Filter>
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>TIPOVIACIC</ogc:PropertyName>
              <ogc:Literal>CRU (Cruce)</ogc:Literal>
            </ogc:PropertyIsEqualTo>
          </ogc:Filter>
          <MinScaleDenominator>1</MinScaleDenominator>
          <MaxScaleDenominator>1000000</MaxScaleDenominator>
          <LineSymbolizer>
            <Stroke>
              <CssParameter name="stroke">#ffff00</CssParameter>
              <CssParameter name="stroke-width">3</CssParameter>
              <CssParameter name="stroke-linejoin">round</CssParameter>
              <CssParameter name="stroke-linecap">round</CssParameter>
            </Stroke>
          </LineSymbolizer>
        </Rule>
        <!-- Regla para TIPOVIACIC CUM (Calle urbana motorizada) -->
        <Rule>
          <Name>CUM (Calle urbana motorizada)</Name>
          <Title>CUM (Calle urbana motorizada)</Title>
          <ogc:Filter>
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>TIPOVIACIC</ogc:PropertyName>
              <ogc:Literal>CUM (Calle urbana motorizada)</ogc:Literal>
            </ogc:PropertyIsEqualTo>
          </ogc:Filter>
          <MinScaleDenominator>1</MinScaleDenominator>
          <MaxScaleDenominator>1000000</MaxScaleDenominator>
          <LineSymbolizer>
            <Stroke>
              <CssParameter name="stroke">#ff0000</CssParameter>
              <CssParameter name="stroke-width">3</CssParameter>
              <CssParameter name="stroke-linejoin">round</CssParameter>
              <CssParameter name="stroke-linecap">round</CssParameter>
              <CssParameter name="stroke-dasharray">2 7</CssParameter>
            </Stroke>
          </LineSymbolizer>
        </Rule>
        <!-- Regla para TIPOVIACIC CUP (Calle urbana peatonal) -->
        <Rule>
          <Name>CUP (Calle urbana peatonal)</Name>
          <Title>CUP (Calle urbana peatonal)</Title>
          <ogc:Filter>
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>TIPOVIACIC</ogc:PropertyName>
              <ogc:Literal>CUP (Calle urbana peatonal)</ogc:Literal>
            </ogc:PropertyIsEqualTo>
          </ogc:Filter>
          <MinScaleDenominator>1</MinScaleDenominator>
          <MaxScaleDenominator>1000000</MaxScaleDenominator>
          <LineSymbolizer>
            <Stroke>
              <CssParameter name="stroke">#73e1ff</CssParameter>
              <CssParameter name="stroke-width">3</CssParameter>
              <CssParameter name="stroke-linejoin">round</CssParameter>
              <CssParameter name="stroke-linecap">round</CssParameter>
              <CssParameter name="stroke-dasharray">2 7</CssParameter>
            </Stroke>
          </LineSymbolizer>
        </Rule>
        <!-- Regla para TIPOVIACIC ECA (Espacio ciclable abierto) -->
        <Rule>
          <Name>ECA (Espacio ciclable abierto)</Name>
          <Title>ECA (Espacio ciclable abierto)</Title>
          <ogc:Filter>
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>TIPOVIACIC</ogc:PropertyName>
              <ogc:Literal>ECA (Espacio ciclable abierto)</ogc:Literal>
            </ogc:PropertyIsEqualTo>
          </ogc:Filter>
          <MinScaleDenominator>1</MinScaleDenominator>
          <MaxScaleDenominator>1000000</MaxScaleDenominator>
          <LineSymbolizer>
            <Stroke>
              <CssParameter name="stroke">#280ab4</CssParameter>
              <CssParameter name="stroke-width">3</CssParameter>
              <CssParameter name="stroke-linejoin">round</CssParameter>
              <CssParameter name="stroke-linecap">round</CssParameter>
            </Stroke>
          </LineSymbolizer>
        </Rule>
        <!-- Regla para TIPOVIACIC ENL (Enlace) -->
        <Rule>
          <Name>ENL (Enlace)</Name>
          <Title>ENL (Enlace)</Title>
          <ogc:Filter>
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>TIPOVIACIC</ogc:PropertyName>
              <ogc:Literal>ENL (Enlace)</ogc:Literal>
            </ogc:PropertyIsEqualTo>
          </ogc:Filter>
          <MinScaleDenominator>1</MinScaleDenominator>
          <MaxScaleDenominator>1000000</MaxScaleDenominator>
          <LineSymbolizer>
            <Stroke>
              <CssParameter name="stroke">#ffffbe</CssParameter>
              <CssParameter name="stroke-width">3</CssParameter>
              <CssParameter name="stroke-linejoin">round</CssParameter>
              <CssParameter name="stroke-linecap">round</CssParameter>
              <CssParameter name="stroke-dasharray">2 7</CssParameter>
            </Stroke>
          </LineSymbolizer>
        </Rule>
        <!-- Regla para TIPOVIACIC OTR (Otro) -->
        <Rule>
          <Name>OTR (Otro)</Name>
          <Title>OTR (Otro)</Title>
          <ogc:Filter>
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>TIPOVIACIC</ogc:PropertyName>
              <ogc:Literal>OTR (Otro)</ogc:Literal>
            </ogc:PropertyIsEqualTo>
          </ogc:Filter>
          <MinScaleDenominator>1</MinScaleDenominator>
          <MaxScaleDenominator>1000000</MaxScaleDenominator>
          <LineSymbolizer>
            <Stroke>
              <CssParameter name="stroke">#ffbee6</CssParameter>
              <CssParameter name="stroke-width">3</CssParameter>
              <CssParameter name="stroke-linejoin">round</CssParameter>
              <CssParameter name="stroke-linecap">round</CssParameter>
              <CssParameter name="stroke-dasharray">2 7</CssParameter>
            </Stroke>
          </LineSymbolizer>
        </Rule>
        <!-- Regla para TIPOVIACIC PBI (Pista bici) -->
        <Rule>
          <Name>PBI (Pista bici)</Name>
          <Title>PBI (Pista bici)</Title>
          <ogc:Filter>
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>TIPOVIACIC</ogc:PropertyName>
              <ogc:Literal>PBI (Pista bici)</ogc:Literal>
            </ogc:PropertyIsEqualTo>
          </ogc:Filter>
          <MinScaleDenominator>1</MinScaleDenominator>
          <MaxScaleDenominator>1000000</MaxScaleDenominator>
          <LineSymbolizer>
            <Stroke>
              <CssParameter name="stroke">#ffaa00</CssParameter>
              <CssParameter name="stroke-width">3</CssParameter>
              <CssParameter name="stroke-linejoin">round</CssParameter>
              <CssParameter name="stroke-linecap">round</CssParameter>
            </Stroke>
          </LineSymbolizer>
        </Rule>
        <!-- Regla para TIPOVIACIC SCI (Senda ciclable) -->
        <Rule>
          <Name>SCI (Senda ciclable)</Name>
          <Title>SCI (Senda ciclable)</Title>
          <ogc:Filter>
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>TIPOVIACIC</ogc:PropertyName>
              <ogc:Literal>SCI (Senda ciclable)</ogc:Literal>
            </ogc:PropertyIsEqualTo>
          </ogc:Filter>
          <MinScaleDenominator>1</MinScaleDenominator>
          <MaxScaleDenominator>1000000</MaxScaleDenominator>
          <LineSymbolizer>
            <Stroke>
              <CssParameter name="stroke">#d2ffbe</CssParameter>
              <CssParameter name="stroke-width">3</CssParameter>
              <CssParameter name="stroke-linejoin">round</CssParameter>
              <CssParameter name="stroke-linecap">round</CssParameter>
            </Stroke>
          </LineSymbolizer>
        </Rule>
        <!-- Regla para TIPOVIACIC VCI (Vía compartida interurbana) -->
        <Rule>
          <Name>VCI (Vía compartida interurbana)</Name>
          <Title>VCI (Vía compartida interurbana)</Title>
          <ogc:Filter>
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>TIPOVIACIC</ogc:PropertyName>
              <ogc:Literal>VCI (Vía compartida interurbana)</ogc:Literal>
            </ogc:PropertyIsEqualTo>
          </ogc:Filter>
          <MinScaleDenominator>1</MinScaleDenominator>
          <MaxScaleDenominator>1000000</MaxScaleDenominator>
          <LineSymbolizer>
            <Stroke>
              <CssParameter name="stroke">#00d7a5</CssParameter>
              <CssParameter name="stroke-width">3</CssParameter>
              <CssParameter name="stroke-linejoin">round</CssParameter>
              <CssParameter name="stroke-linecap">round</CssParameter>
            </Stroke>
          </LineSymbolizer>
        </Rule>
        <!-- Regla para TIPOVIACIC Tipo de vía desconocido (SCL o resto de valores) -->
        <Rule>
          <Name>Tipo de vía desconocido</Name>
          <Title>Tipo de vía desconocido</Title>
        <ogc:Filter>
          <And>
            <ogc:PropertyIsNotEqualTo>
              <ogc:PropertyName>TIPOVIACIC</ogc:PropertyName>
              <ogc:Literal>ABC (Acera bici compartida)</ogc:Literal>
            </ogc:PropertyIsNotEqualTo>
            <ogc:PropertyIsNotEqualTo>
              <ogc:PropertyName>TIPOVIACIC</ogc:PropertyName>
              <ogc:Literal>ABD (Acera bici delimitada)</ogc:Literal>
            </ogc:PropertyIsNotEqualTo>
            <ogc:PropertyIsNotEqualTo>
              <ogc:PropertyName>TIPOVIACIC</ogc:PropertyName>
              <ogc:Literal>BUS (Bici-Bus)</ogc:Literal>
            </ogc:PropertyIsNotEqualTo>
            <ogc:PropertyIsNotEqualTo>
              <ogc:PropertyName>TIPOVIACIC</ogc:PropertyName>
              <ogc:Literal>CAR (Carretera)</ogc:Literal>
            </ogc:PropertyIsNotEqualTo>
            <ogc:PropertyIsNotEqualTo>
              <ogc:PropertyName>TIPOVIACIC</ogc:PropertyName>
              <ogc:Literal>CBI (Carril bici)</ogc:Literal>
            </ogc:PropertyIsNotEqualTo>
            <ogc:PropertyIsNotEqualTo>
              <ogc:PropertyName>TIPOVIACIC</ogc:PropertyName>
              <ogc:Literal>CBL (Carril bici en plataforma peatonal)</ogc:Literal>
            </ogc:PropertyIsNotEqualTo>
            <ogc:PropertyIsNotEqualTo>
              <ogc:PropertyName>TIPOVIACIC</ogc:PropertyName>
              <ogc:Literal>CBP (Carril bici protegido)</ogc:Literal>
            </ogc:PropertyIsNotEqualTo>
            <ogc:PropertyIsNotEqualTo>
              <ogc:PropertyName>TIPOVIACIC</ogc:PropertyName>
              <ogc:Literal>CCA (Ciclocalle)</ogc:Literal>
            </ogc:PropertyIsNotEqualTo>
            <ogc:PropertyIsNotEqualTo>
              <ogc:PropertyName>TIPOVIACIC</ogc:PropertyName>
              <ogc:Literal>CCL (Ciclocarril)</ogc:Literal>
            </ogc:PropertyIsNotEqualTo>
            <ogc:PropertyIsNotEqualTo>
              <ogc:PropertyName>TIPOVIACIC</ogc:PropertyName>
              <ogc:Literal>CPP (Circulación permitida provisionalmente)</ogc:Literal>
            </ogc:PropertyIsNotEqualTo>
            <ogc:PropertyIsNotEqualTo>
              <ogc:PropertyName>TIPOVIACIC</ogc:PropertyName>
              <ogc:Literal>ZRE (Zona residencial)</ogc:Literal>
            </ogc:PropertyIsNotEqualTo>
            <ogc:PropertyIsNotEqualTo>
              <ogc:PropertyName>TIPOVIACIC</ogc:PropertyName>
              <ogc:Literal>CRU (Cruce)</ogc:Literal>
            </ogc:PropertyIsNotEqualTo>
            <ogc:PropertyIsNotEqualTo>
              <ogc:PropertyName>TIPOVIACIC</ogc:PropertyName>
              <ogc:Literal>CUM (Calle urbana motorizada)</ogc:Literal>
            </ogc:PropertyIsNotEqualTo>
            <ogc:PropertyIsNotEqualTo>
              <ogc:PropertyName>TIPOVIACIC</ogc:PropertyName>
              <ogc:Literal>CUP (Calle urbana peatonal)</ogc:Literal>
            </ogc:PropertyIsNotEqualTo>
            <ogc:PropertyIsNotEqualTo>
              <ogc:PropertyName>TIPOVIACIC</ogc:PropertyName>
              <ogc:Literal>ECA (Espacio ciclable abierto)</ogc:Literal>
            </ogc:PropertyIsNotEqualTo>
            <ogc:PropertyIsNotEqualTo>
              <ogc:PropertyName>TIPOVIACIC</ogc:PropertyName>
              <ogc:Literal>ENL (Enlace)</ogc:Literal>
            </ogc:PropertyIsNotEqualTo>
            <ogc:PropertyIsNotEqualTo>
              <ogc:PropertyName>TIPOVIACIC</ogc:PropertyName>
              <ogc:Literal>OTR (Otro)</ogc:Literal>
            </ogc:PropertyIsNotEqualTo>
            <ogc:PropertyIsNotEqualTo>
              <ogc:PropertyName>TIPOVIACIC</ogc:PropertyName>
              <ogc:Literal>PBI (Pista bici)</ogc:Literal>
            </ogc:PropertyIsNotEqualTo>
            <ogc:PropertyIsNotEqualTo>
              <ogc:PropertyName>TIPOVIACIC</ogc:PropertyName>
              <ogc:Literal>SCI (Senda ciclable)</ogc:Literal>
            </ogc:PropertyIsNotEqualTo>
            <ogc:PropertyIsNotEqualTo>
              <ogc:PropertyName>TIPOVIACIC</ogc:PropertyName>
              <ogc:Literal>VCI (Vía compartida interurbana)</ogc:Literal>
            </ogc:PropertyIsNotEqualTo>
          </And>
        </ogc:Filter>
          <MinScaleDenominator>1</MinScaleDenominator>
          <MaxScaleDenominator>1000000</MaxScaleDenominator>
          <LineSymbolizer>
            <Stroke>
              <CssParameter name="stroke">#000000</CssParameter>
              <CssParameter name="stroke-width">1.5</CssParameter>
              <CssParameter name="stroke-linejoin">round</CssParameter>
              <CssParameter name="stroke-linecap">round</CssParameter>
              <CssParameter name="stroke-dasharray">2 7</CssParameter>
            </Stroke>
          </LineSymbolizer>
        </Rule>
        <!-- Regla para dibujar una etiqueta con la dirección del sentido de circulación en vías de dirección única -->
        <Rule>
          <Name>Sentido Unidireccional (Escala &lt; 1.000)</Name>
          <Title>Sentido Unidireccional (Escala &lt; 1.000)</Title>
          <ogc:Filter>
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>SENTIDO</ogc:PropertyName>
              <ogc:Literal>UNO (Unidireccional)</ogc:Literal>
            </ogc:PropertyIsEqualTo>
          </ogc:Filter>
          <MinScaleDenominator>1</MinScaleDenominator>
          <MaxScaleDenominator>1000</MaxScaleDenominator>
          <TextSymbolizer>
            <Label>
              <ogc:Literal>&#x003e;</ogc:Literal>
            </Label>
            <Font>
              <CssParameter name="font-family">Courier New</CssParameter>
              <CssParameter name="font-size">25</CssParameter>
              <CssParameter name="font-style">normal</CssParameter>
              <CssParameter name="font-weight">bold</CssParameter>
            </Font>
            <LabelPlacement>
              <LinePlacement>
                <PerpendicularOffset>0</PerpendicularOffset>
              </LinePlacement>
            </LabelPlacement>
            <Fill>
              <CssParameter name="fill">#ffffff</CssParameter>
            </Fill>
            <Halo>
              <Radius>1</Radius>
              <Fill>
                <CssParameter name="fill">#000000</CssParameter>
              </Fill>
            </Halo>
            <VendorOption name="followLine">true</VendorOption>
            <VendorOption name="forceLeftToRight">false</VendorOption>
            <VendorOption name="repeat">200</VendorOption>
          </TextSymbolizer>
        </Rule>
        <!-- Regla para dibujar un pequeño punto blanco en los extremos de un tramo -->
        <!-- <Rule>
          <Name>Puntos en los extremos</Name>
          <Title>Puntos en los extremos</Title>
          <ogc:Filter>
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>SENTIDO</ogc:PropertyName>
              <ogc:Literal>UNO (Unidireccional)</ogc:Literal>
            </ogc:PropertyIsEqualTo>
          </ogc:Filter>
          <MinScaleDenominator>1</MinScaleDenominator>
          <MaxScaleDenominator>1000</MaxScaleDenominator>
          <PointSymbolizer>
            <Geometry>
              <ogc:Function name="startPoint">
                <ogc:PropertyName>the_geom</ogc:PropertyName>
              </ogc:Function>
            </Geometry>
            <Graphic>
              <Mark>
                <WellKnownName>circle</WellKnownName>
                <Fill>
                  <CssParameter name="fill">#ffffff</CssParameter>
                </Fill>
              </Mark>
              <Size>4</Size>
            </Graphic>
          </PointSymbolizer>
          <PointSymbolizer>
            <Geometry>
              <ogc:Function name="endPoint">
                <ogc:PropertyName>the_geom</ogc:PropertyName>
              </ogc:Function>
            </Geometry>
            <Graphic>
              <Mark>
                <WellKnownName>circle</WellKnownName>
                <Fill>
                  <CssParameter name="fill">#ffffff</CssParameter>
                </Fill>
              </Mark>
              <Size>4</Size>
            </Graphic>
          </PointSymbolizer>
        </Rule> -->
        <!-- FIN DE REGLAS -->
      </FeatureTypeStyle>
    </UserStyle>
  </NamedLayer>
</StyledLayerDescriptor>
