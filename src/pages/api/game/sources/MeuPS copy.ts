import { JSDOM } from "jsdom";
import ITrendDTO, {
  ISource,
  ISearchParams,
  IShowDetailMagnetDTO,
  Answer,
  IResponseHomeDTO,
} from ".";

class MeuPS implements ISource {
  getOriginUrl(): string {
    return "https://meups.com.br/feed/";
  }

  async getHome(): Promise<IResponseHomeDTO> {
    const url = this.getOriginUrl();
    const response = new JSDOM(`
  <?xml version="1.0" encoding="UTF-8"?><rss version="2.0"
	xmlns:content="http://purl.org/rss/1.0/modules/content/"
	xmlns:wfw="http://wellformedweb.org/CommentAPI/"
	xmlns:dc="http://purl.org/dc/elements/1.1/"
	xmlns:atom="http://www.w3.org/2005/Atom"
	xmlns:sy="http://purl.org/rss/1.0/modules/syndication/"
	xmlns:slash="http://purl.org/rss/1.0/modules/slash/"
	xmlns:media="http://search.yahoo.com/mrss/" >

<channel>
	<title>MeuPlayStation | Tudo sobre PlayStation</title>
	<atom:link href="https://meups.com.br/feed/" rel="self" type="application/rss+xml" />
	<link>https://meups.com.br</link>
	<description>Tudo sobre PS5, PS4 e o mundo PlayStation. Notícias diárias, reviews, tutoriais e lançamentos para quem vive o universo gamer.</description>
	<lastBuildDate>Wed, 10 Sep 2025 08:09:31 +0000</lastBuildDate>
	<language>pt-BR</language>
	<sy:updatePeriod>
	hourly	</sy:updatePeriod>
	<sy:updateFrequency>
	1	</sy:updateFrequency>
	<generator>https://wordpress.org/?v=6.8.2</generator>

<image>
	<url>https://meups.com.br/wp-content/uploads/2024/08/512-96x96.png</url>
	<title>MeuPlayStation | Tudo sobre PlayStation</title>
	<link>https://meups.com.br</link>
	<width>32</width>
	<height>32</height>
</image> 
	<item>
		<title>Novo campeão chegará a 2XKO via Passe de Batalha</title>
		<link>https://meups.com.br/noticias/2xko-deve-receber-decimo-personagem/</link>
					<comments>https://meups.com.br/noticias/2xko-deve-receber-decimo-personagem/#respond</comments>
		
		<dc:creator><![CDATA[Thiago Barros]]></dc:creator>
		<pubDate>Wed, 10 Sep 2025 08:09:31 +0000</pubDate>
				<category><![CDATA[Notícias]]></category>
		<category><![CDATA[2XKO]]></category>
		<guid isPermaLink="false">https://meups.com.br/?p=551117</guid>

					<description><![CDATA[Datamine indica mais um personagem de League of Legends que deve estar no jogo de luta 2XKO]]></description>
		
					<wfw:commentRss>https://meups.com.br/noticias/2xko-deve-receber-decimo-personagem/feed/</wfw:commentRss>
			<slash:comments>0</slash:comments>
		
		
			</item>
		<item>
		<title>Newzoo: indústria dos games baterá US$ 188,8 bi neste ano</title>
		<link>https://meups.com.br/noticias/newzoo-industria-dos-games-neste-ano/</link>
					<comments>https://meups.com.br/noticias/newzoo-industria-dos-games-neste-ano/#respond</comments>
		
		<dc:creator><![CDATA[Thiago Barros]]></dc:creator>
		<pubDate>Wed, 10 Sep 2025 08:00:52 +0000</pubDate>
				<category><![CDATA[Notícias]]></category>
		<category><![CDATA[Indústria dos games]]></category>
		<guid isPermaLink="false">https://meups.com.br/?p=551115</guid>

					<description><![CDATA[Números estão representando um crescimento de 3,4% em relação ao ano anterior da indústria dos games]]></description>
		
					<wfw:commentRss>https://meups.com.br/noticias/newzoo-industria-dos-games-neste-ano/feed/</wfw:commentRss>
			<slash:comments>0</slash:comments>
		
		
			</item>
		<item>
		<title>Dead Island 2 bate 20 milhões de jogadores</title>
		<link>https://meups.com.br/noticias/dead-island-2-bate-20-milhoes-de-jogadores/</link>
					<comments>https://meups.com.br/noticias/dead-island-2-bate-20-milhoes-de-jogadores/#respond</comments>
		
		<dc:creator><![CDATA[Thiago Barros]]></dc:creator>
		<pubDate>Wed, 10 Sep 2025 07:56:22 +0000</pubDate>
				<category><![CDATA[Notícias]]></category>
		<category><![CDATA[Dead Island 2]]></category>
		<guid isPermaLink="false">https://meups.com.br/?p=551112</guid>

					<description><![CDATA[Dead Island 2 foi lançado em 21 de abril de 2023 para PlayStation 5, Xbox One, Xbox Series X/S e PC]]></description>
		
					<wfw:commentRss>https://meups.com.br/noticias/dead-island-2-bate-20-milhoes-de-jogadores/feed/</wfw:commentRss>
			<slash:comments>0</slash:comments>
		
		
			</item>
		<item>
		<title>Filme de BioShock &#8220;ressurge&#8221; e irá adaptar o primeiro jogo</title>
		<link>https://meups.com.br/noticias/filme-de-bioshock-ressurge/</link>
					<comments>https://meups.com.br/noticias/filme-de-bioshock-ressurge/#respond</comments>
		
		<dc:creator><![CDATA[Thiago Barros]]></dc:creator>
		<pubDate>Wed, 10 Sep 2025 07:49:45 +0000</pubDate>
				<category><![CDATA[Notícias]]></category>
		<category><![CDATA[Bioshock]]></category>
		<guid isPermaLink="false">https://meups.com.br/?p=551110</guid>

					<description><![CDATA[Após anos de indefinição, a adaptação cinematográfica de BioShock parece, enfim, caminhar em direção mais concreta]]></description>
		
					<wfw:commentRss>https://meups.com.br/noticias/filme-de-bioshock-ressurge/feed/</wfw:commentRss>
			<slash:comments>0</slash:comments>
		
		
			</item>
		<item>
		<title>Conheça os favoritos ao papel de Kratos na série de God of War</title>
		<link>https://meups.com.br/noticias/favoritos-ao-papel-de-kratos-na-serie/</link>
					<comments>https://meups.com.br/noticias/favoritos-ao-papel-de-kratos-na-serie/#respond</comments>
		
		<dc:creator><![CDATA[Thiago Barros]]></dc:creator>
		<pubDate>Wed, 10 Sep 2025 07:46:23 +0000</pubDate>
				<category><![CDATA[Notícias]]></category>
		<category><![CDATA[God of War]]></category>
		<guid isPermaLink="false">https://meups.com.br/?p=551108</guid>

					<description><![CDATA[Depois da notícia de que a série de God of War vai começar as filmagens em seis meses, rumores sobre Kratos começam a circular...]]></description>
		
					<wfw:commentRss>https://meups.com.br/noticias/favoritos-ao-papel-de-kratos-na-serie/feed/</wfw:commentRss>
			<slash:comments>0</slash:comments>
		
		
			</item>
		<item>
		<title>Rainbow Six Siege terá torneios organizados por times e streamers</title>
		<link>https://meups.com.br/noticias/rainbow-six-siege-tera-torneios-organizados/</link>
					<comments>https://meups.com.br/noticias/rainbow-six-siege-tera-torneios-organizados/#respond</comments>
		
		<dc:creator><![CDATA[Thiago Barros]]></dc:creator>
		<pubDate>Wed, 10 Sep 2025 03:05:31 +0000</pubDate>
				<category><![CDATA[Notícias]]></category>
		<category><![CDATA[Rainbow Six Siege]]></category>
		<guid isPermaLink="false">https://meups.com.br/?p=551106</guid>

					<description><![CDATA[O cenário competitivo de Rainbow Six Siege segue movimentado e cheio de oportunidades para novos jogadores]]></description>
		
					<wfw:commentRss>https://meups.com.br/noticias/rainbow-six-siege-tera-torneios-organizados/feed/</wfw:commentRss>
			<slash:comments>0</slash:comments>
		
		
			</item>
		<item>
		<title>Nova versão de Onimusha 3 não é foco da Capcom no momento</title>
		<link>https://meups.com.br/noticias/onimusha-3-nao-deve-sair/</link>
					<comments>https://meups.com.br/noticias/onimusha-3-nao-deve-sair/#respond</comments>
		
		<dc:creator><![CDATA[Thiago Barros]]></dc:creator>
		<pubDate>Wed, 10 Sep 2025 03:02:44 +0000</pubDate>
				<category><![CDATA[Notícias]]></category>
		<category><![CDATA[Onimusha]]></category>
		<category><![CDATA[Onimusha 3]]></category>
		<guid isPermaLink="false">https://meups.com.br/?p=551103</guid>

					<description><![CDATA[Vale lembrar que a franquia Onimusha ficou em hiato por mais de uma década, desde Onimusha: Dawn of Dreams]]></description>
		
					<wfw:commentRss>https://meups.com.br/noticias/onimusha-3-nao-deve-sair/feed/</wfw:commentRss>
			<slash:comments>0</slash:comments>
		
		
			</item>
		<item>
		<title>Hollow Knight: Silksong tem dificuldade secreta ainda maior</title>
		<link>https://meups.com.br/noticias/silksong-modo-secreto-dificuldade/</link>
					<comments>https://meups.com.br/noticias/silksong-modo-secreto-dificuldade/#respond</comments>
		
		<dc:creator><![CDATA[Thiago Barros]]></dc:creator>
		<pubDate>Wed, 10 Sep 2025 02:59:57 +0000</pubDate>
				<category><![CDATA[Notícias]]></category>
		<category><![CDATA[Hollow Knight Silksong]]></category>
		<guid isPermaLink="false">https://meups.com.br/?p=551100</guid>

					<description><![CDATA[Enquanto uma galera reclama que o jogo já está difícil, os fãs de Hollow Knight: Silksong descobriram um modo secreto de dificuldade extrema]]></description>
		
					<wfw:commentRss>https://meups.com.br/noticias/silksong-modo-secreto-dificuldade/feed/</wfw:commentRss>
			<slash:comments>0</slash:comments>
		
		
			</item>
		<item>
		<title>Estúdio confirma desenvolvimento de Dead Island 3</title>
		<link>https://meups.com.br/noticias/estudio-confirma-dead-island-3/</link>
					<comments>https://meups.com.br/noticias/estudio-confirma-dead-island-3/#respond</comments>
		
		<dc:creator><![CDATA[Thiago Barros]]></dc:creator>
		<pubDate>Wed, 10 Sep 2025 02:57:02 +0000</pubDate>
				<category><![CDATA[Notícias]]></category>
		<category><![CDATA[Dead Island 3]]></category>
		<guid isPermaLink="false">https://meups.com.br/?p=551095</guid>

					<description><![CDATA[Ainda não há previsão de lançamento para Dead Island 3, mas a confirmação chega como um passo decisivo para a franquia]]></description>
		
					<wfw:commentRss>https://meups.com.br/noticias/estudio-confirma-dead-island-3/feed/</wfw:commentRss>
			<slash:comments>0</slash:comments>
		
		
			</item>
		<item>
		<title>Sly Cooper não deve voltar a ter um novo jogo tão cedo</title>
		<link>https://meups.com.br/noticias/sly-cooper-nao-deve-ter-um-novo-jogo/</link>
					<comments>https://meups.com.br/noticias/sly-cooper-nao-deve-ter-um-novo-jogo/#respond</comments>
		
		<dc:creator><![CDATA[Daniel dos Reis]]></dc:creator>
		<pubDate>Tue, 09 Sep 2025 19:50:21 +0000</pubDate>
				<category><![CDATA[Notícias]]></category>
		<category><![CDATA[Sly Cooper]]></category>
		<guid isPermaLink="false">https://meups.com.br/?p=551090</guid>

					<description><![CDATA[Diretor da Sucker Punch esfria as expectativas de um possível novo jogo do ladrãozinho]]></description>
		
					<wfw:commentRss>https://meups.com.br/noticias/sly-cooper-nao-deve-ter-um-novo-jogo/feed/</wfw:commentRss>
			<slash:comments>0</slash:comments>
		
		
			</item>
		<item>
		<title>Sony convida fãs a compartilharem suas memórias relacionadas ao PlayStation</title>
		<link>https://meups.com.br/noticias/compartilharem-memorias-playstation/</link>
					<comments>https://meups.com.br/noticias/compartilharem-memorias-playstation/#respond</comments>
		
		<dc:creator><![CDATA[Daniel dos Reis]]></dc:creator>
		<pubDate>Tue, 09 Sep 2025 18:36:10 +0000</pubDate>
				<category><![CDATA[Notícias]]></category>
		<category><![CDATA[PlayStation]]></category>
		<guid isPermaLink="false">https://meups.com.br/?p=551086</guid>

					<description><![CDATA[Iniciativa vai reunir fotos e vídeos nostálgicos dos jogadores em uma grande homenagem à história da marca]]></description>
		
					<wfw:commentRss>https://meups.com.br/noticias/compartilharem-memorias-playstation/feed/</wfw:commentRss>
			<slash:comments>0</slash:comments>
		
		
			</item>
		<item>
		<title>SEGA anuncia retorno de mais um clássico</title>
		<link>https://meups.com.br/noticias/sega-anuncia-retorno-de-mais-um-classico/</link>
					<comments>https://meups.com.br/noticias/sega-anuncia-retorno-de-mais-um-classico/#respond</comments>
		
		<dc:creator><![CDATA[Thiago Barros]]></dc:creator>
		<pubDate>Tue, 09 Sep 2025 18:22:20 +0000</pubDate>
				<category><![CDATA[Notícias]]></category>
		<category><![CDATA[Panzer Dragoon II Zwei]]></category>
		<category><![CDATA[SEGA]]></category>
		<guid isPermaLink="false">https://meups.com.br/?p=551083</guid>

					<description><![CDATA[Mais uma clássica franquia da SEGA está de volta. A Forever Entertainment anunciou o remake de Panzer Dragoon II Zwei!]]></description>
		
					<wfw:commentRss>https://meups.com.br/noticias/sega-anuncia-retorno-de-mais-um-classico/feed/</wfw:commentRss>
			<slash:comments>0</slash:comments>
		
		
			</item>
		<item>
		<title>Mídia física de Death Stranding 2 atinge seu menor preço histórico</title>
		<link>https://meups.com.br/noticias/midia-fisica-death-stranding-2-menor-preco/</link>
					<comments>https://meups.com.br/noticias/midia-fisica-death-stranding-2-menor-preco/#respond</comments>
		
		<dc:creator><![CDATA[Daniel dos Reis]]></dc:creator>
		<pubDate>Tue, 09 Sep 2025 17:55:20 +0000</pubDate>
				<category><![CDATA[Notícias]]></category>
		<category><![CDATA[Death Stranding 2: On The Beach]]></category>
		<guid isPermaLink="false">https://meups.com.br/?p=551080</guid>

					<description><![CDATA[Desconto exclusivo leva o jogo de Hideo Kojima para abaixo dos R$200 por tempo limitado]]></description>
		
					<wfw:commentRss>https://meups.com.br/noticias/midia-fisica-death-stranding-2-menor-preco/feed/</wfw:commentRss>
			<slash:comments>0</slash:comments>
		
		
			</item>
		<item>
		<title>30 anos de PlayStation: veja os jogos que mais venderam até hoje nos EUA</title>
		<link>https://meups.com.br/noticias/30-anos-de-playstation-jogos-mais-venderam/</link>
					<comments>https://meups.com.br/noticias/30-anos-de-playstation-jogos-mais-venderam/#respond</comments>
		
		<dc:creator><![CDATA[Daniel dos Reis]]></dc:creator>
		<pubDate>Tue, 09 Sep 2025 17:33:32 +0000</pubDate>
				<category><![CDATA[Notícias]]></category>
		<category><![CDATA[Call of Duty]]></category>
		<category><![CDATA[GTA V]]></category>
		<guid isPermaLink="false">https://meups.com.br/?p=551072</guid>

					<description><![CDATA[GTA V reina, mas a franquia Call of Duty domina grande parte da lista]]></description>
		
					<wfw:commentRss>https://meups.com.br/noticias/30-anos-de-playstation-jogos-mais-venderam/feed/</wfw:commentRss>
			<slash:comments>0</slash:comments>
		
		
			</item>
		<item>
		<title>Não contavam com a minha astúcia! México quer criar imposto para jogos violentos</title>
		<link>https://meups.com.br/noticias/mexico-criar-imposto-para-jogos-violentos/</link>
					<comments>https://meups.com.br/noticias/mexico-criar-imposto-para-jogos-violentos/#respond</comments>
		
		<dc:creator><![CDATA[Daniel dos Reis]]></dc:creator>
		<pubDate>Tue, 09 Sep 2025 16:55:59 +0000</pubDate>
				<category><![CDATA[Notícias]]></category>
		<guid isPermaLink="false">https://meups.com.br/?p=551066</guid>

					<description><![CDATA[Proposta prevê taxa de 8% sobre serviços digitais ligados a games com violência]]></description>
		
					<wfw:commentRss>https://meups.com.br/noticias/mexico-criar-imposto-para-jogos-violentos/feed/</wfw:commentRss>
			<slash:comments>0</slash:comments>
		
		
			</item>
		<item>
		<title>Novo update melhora Lost Soul Aside no PS5, mas será o suficiente?</title>
		<link>https://meups.com.br/noticias/novo-update-melhora-lost-soul-aside-ps5/</link>
					<comments>https://meups.com.br/noticias/novo-update-melhora-lost-soul-aside-ps5/#respond</comments>
		
		<dc:creator><![CDATA[Daniel dos Reis]]></dc:creator>
		<pubDate>Tue, 09 Sep 2025 15:19:01 +0000</pubDate>
				<category><![CDATA[Notícias]]></category>
		<category><![CDATA[Lost Soul Aside]]></category>
		<guid isPermaLink="false">https://meups.com.br/?p=551060</guid>

					<description><![CDATA[Patch 1.006 busca resolver problemas técnicos e suavizar o combate. Jogo segue com média de 63 no Metacritic]]></description>
		
					<wfw:commentRss>https://meups.com.br/noticias/novo-update-melhora-lost-soul-aside-ps5/feed/</wfw:commentRss>
			<slash:comments>0</slash:comments>
		
		
			</item>
		<item>
		<title>Rumo ao Battlefield 6: EA facilita progresso no Passe de Batalha, mas com um porém</title>
		<link>https://meups.com.br/noticias/rumo-ao-battlefield-6-ea-facilita-progresso/</link>
					<comments>https://meups.com.br/noticias/rumo-ao-battlefield-6-ea-facilita-progresso/#respond</comments>
		
		<dc:creator><![CDATA[Daniel dos Reis]]></dc:creator>
		<pubDate>Tue, 09 Sep 2025 14:57:26 +0000</pubDate>
				<category><![CDATA[Notícias]]></category>
		<category><![CDATA[Battlefield 2042]]></category>
		<category><![CDATA[Battlefield 6]]></category>
		<guid isPermaLink="false">https://meups.com.br/?p=551056</guid>

					<description><![CDATA[Atualização de Battlefield 2042 permite pagar para avançar no Passe rumo ao próximo jogo da franquia]]></description>
		
					<wfw:commentRss>https://meups.com.br/noticias/rumo-ao-battlefield-6-ea-facilita-progresso/feed/</wfw:commentRss>
			<slash:comments>0</slash:comments>
		
		
			</item>
		<item>
		<title>Towa and the Guardians of the Sacred Tree ganha trailer de história</title>
		<link>https://meups.com.br/noticias/towa-and-the-guardians-of-the-sacred-tree-2/</link>
					<comments>https://meups.com.br/noticias/towa-and-the-guardians-of-the-sacred-tree-2/#respond</comments>
		
		<dc:creator><![CDATA[Thiago Barros]]></dc:creator>
		<pubDate>Tue, 09 Sep 2025 14:38:57 +0000</pubDate>
				<category><![CDATA[Notícias]]></category>
		<category><![CDATA[Towa and the Guardians of the Sacred Tree]]></category>
		<guid isPermaLink="false">https://meups.com.br/?p=551052</guid>

					<description><![CDATA[Conheça todos os detalhes do enredo de Towa and the Guardians of the Sacred Tree]]></description>
		
					<wfw:commentRss>https://meups.com.br/noticias/towa-and-the-guardians-of-the-sacred-tree-2/feed/</wfw:commentRss>
			<slash:comments>0</slash:comments>
		
		
		<media:content url="https://www.youtube.com/embed/ZijZoog6MpY" medium="video" width="1280" height="720">
			<media:player url="https://www.youtube.com/embed/ZijZoog6MpY" />
			<media:title type="plain">Towa and the Guardians of the Sacred Tree – Trailer de História</media:title>
			<media:description type="html"><![CDATA[Heróis dão tudo de si. Custe o que custar.Towa and the Guardians of the Sacred Tree permanecem unidos — e chegam no dia 19 de setembro!Reserve #TowaGame em p...]]></media:description>
			<media:thumbnail url="https://meups.com.br/wp-content/uploads/2025/09/towa-and-the-guardians-of-the-sa.jpg" />
			<media:rating scheme="urn:simple">nonadult</media:rating>
		</media:content>
	</item>
		<item>
		<title>Cronos: The New Dawn ultrapassa 200 mil cópias vendidas</title>
		<link>https://meups.com.br/noticias/cronos-the-new-dawn-ultrapassa-200-mil/</link>
					<comments>https://meups.com.br/noticias/cronos-the-new-dawn-ultrapassa-200-mil/#respond</comments>
		
		<dc:creator><![CDATA[Thiago Barros]]></dc:creator>
		<pubDate>Tue, 09 Sep 2025 14:35:20 +0000</pubDate>
				<category><![CDATA[Notícias]]></category>
		<category><![CDATA[Cronos: The New Dawn]]></category>
		<guid isPermaLink="false">https://meups.com.br/?p=551050</guid>

					<description><![CDATA[A Bloober Team anunciou que Cronos: The New Dawn, sua nova propriedade intelectual, já vendeu mais de 200 mil]]></description>
		
					<wfw:commentRss>https://meups.com.br/noticias/cronos-the-new-dawn-ultrapassa-200-mil/feed/</wfw:commentRss>
			<slash:comments>0</slash:comments>
		
		
			</item>
		<item>
		<title>Marvel’s Wolverine é apontado como próximo grande sucesso</title>
		<link>https://meups.com.br/noticias/marvels-wolverine-e-apontado-como-hit/</link>
					<comments>https://meups.com.br/noticias/marvels-wolverine-e-apontado-como-hit/#respond</comments>
		
		<dc:creator><![CDATA[Thiago Barros]]></dc:creator>
		<pubDate>Tue, 09 Sep 2025 14:32:13 +0000</pubDate>
				<category><![CDATA[Notícias]]></category>
		<category><![CDATA[Marvel's Wolverine]]></category>
		<guid isPermaLink="false">https://meups.com.br/?p=551047</guid>

					<description><![CDATA[A espera por Marvel’s Wolverine parece que vai valer a pena. Segundo o insider Tom Henderson, ele tem potencial de blockbuster]]></description>
		
					<wfw:commentRss>https://meups.com.br/noticias/marvels-wolverine-e-apontado-como-hit/feed/</wfw:commentRss>
			<slash:comments>0</slash:comments>
		
		
			</item>
	</channel>
</rss>`);
    const { document } = response.window;
    const feed = document.body.innerHTML;
    const items = feed
      .replaceAll("\n", "")
      .replaceAll("\t", "")
      .match(/<item>(.*?)<\/item>/g);
    //console.log("result", document.body.innerHTML);

    const replaceSpaces = (text: string) => {
      return text
        .replace(/\n|\r|\t/g, "")
        .replace(/\n|\s{2,}/g, "")
        .replace(/\\n|\\r|\\t/g, "")
        .replace(/\s{2,}/g, "");
    };

    const getContent = (elPost: Document) => {
      console.log("getContent", elPost);
      return {
        link: elPost
          .querySelector("comments")
          ?.textContent.replace("#respond", ""),
        title: replaceSpaces(
          String(elPost.querySelector("title")?.textContent)
        ),
        thumb: elPost.querySelector("img[data-src]")?.getAttribute("data-src"),
        created_at: "",
      };
    };

    const postsData = (items ?? []).map((elPost) =>
      getContent(new JSDOM(elPost).window.document)
    );
    //.filter((elPost) => elPost.thumb && elPost.title != "undefined");

    return { posts: [...postsData] };
  }
}

export default new MeuPS();
