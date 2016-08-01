# Future Proof by The Code Collective

[![](html/Video.png)](https://www.youtube.com/watch?v=jsReas9BljM&feature=youtu.be)

## Developer Story
As a team of software developers we understand that machines are replacing labour on both a physical level, and mental level. Automation and business needs to optimise for efficiency are putting people out of work, or significantly reducing the required hours to complete specific tasks. For our population to meet to the challenges presented by these changing employment conditions, we need our current workforce to be able to re-locate, re-skill, or re-educate; the other option - retire - is not available to the great majority of the populace.

For those yet to enter the workforce, we need to provide better pathways to employment in industries that are growing, not shrinking, and have an increasing need for human resources, not an excess of existing trained and experienced staff or job seekers. Thus we need to ensure that our education system is geared up to output more of what is predicted <em>to be</em> needed, and less of what <em>was</em> needed in the past.

We have used several indicators of business investment, growth and profitability (taxation) to highlight industries that are on the rise, mashed up with employment data over time showing how that growth is having an effect on the workforce in either a positive or negative manner. The intent is to highlight industry’s absorbing more of the workforce relative to the population in a statistical area, and industries shedding workforce.

Because industries cannot relocate as easily as people, it makes sense that this data is taken from a National level and mapped over a local area to better give job seekers an idea of where employment opportunities are growing, and where they are falling, and in what industries, then present that data based on a preferred locality. This then gives us the ability to not just rank employment prospects, but also compare it to housing affordability and other social indicators as the expected pay for a particular job may not match the cost of living or expected lifestyle in that area.

## Goal
To provide a web based resource that can facilitate the best application of human resources to industry requirements using data to determine latent needs present in the local economy and growth industries of a particular area and the expected financial outcomes for employees based on trends present in related financial, economic and other indicators.

## Timeline
After establishing the team members on the Friday we fleshed out the project concept on the Saturday, and created our entry home page. We had intended to make the entire concept revolve around giving people access to data in a clear and concise manner using a language based query that answered one of 3 key questions;

1. If I have a specific set of industry relevant experience where should I be looking to live and work?
2. If I want to live in a specific region what industry relavent skills should I be acquiring for the best chance of employment?
3. What educational pathways should I pursue to ensure long term employment options if I am planning on living in a particular region?

The decision was made to mash up all the data to create an index weight, then apply that weight to the current data for the industry group in the region specified, with 3 structured data query options based on the language path chosen to search the data;

* All areas (in a region) : Specific industry
* Specific area : All industries
* Specific area : Specific Industry

Unfortunately the data set being used for our pimary data set (ABS Experimental Data by Industry and Region over 2011-2014) turned out to be immense, and unable to be replacted in an SQL datanase. In attempting to do so, we burned through a lot of Azure time! We ended up taking  the data we needed for a specific language pathway (Moving to the Sunshine Coast with Education Industry experience) and then applying a rudimentary weighting to the employment and industry data returned.

## Index Weighting
Employment (FTE) returned from lastest point in time, wighted on growth trend compared to population growth trend, banded in 5 levels => Job prospects

Industry Value Added ($) / FTE  returned from lastest point in time, with statistically insignificant results ignored (FTE < 50), weighted on;

* ABS, industry growth over time
* ATO, aggregated industry profitability (not in GovHack dataset?) over time
* DIIS, Research and Development (innovation) regionally over time, and relative to national basline
* DOE, Vacancies advertised in industry in last 6 months, and trend over time.

## Progress
[Photos of progress](/Progress)

## Proof of Concept
The proof of concept host went south late on Sunday so we have transitioned the code to static responses and re-hosted on a simple HTML service to illustrate the intended user interface. The natural language pathways are limited to a strict subset of data sets and the data is static as pulled from the ABS govhack.abs.gov.au site using the API, and then manipulate in Excel.

## Prototype
[Web app](http://govhack2016.practiceofcode.com)


## API
(Currently offline due to over allowed tier usage)
[Swagger](https://govhack2016ausc.azurewebsites.net/swagger)

## Technology
### Server/Api
* ASP.Net Mvc
* ASP.Net WebApi
 
### Hosting
* Azure

### Continuos Integration
![Build Status](https://adamd.visualstudio.com/_apis/public/build/definitions/498153dd-df0f-4ffe-81f2-f7456d064808/11/badge "Build Status")

* [Visual Studio Team Services](https://www.visualstudio.com)

### WebApp
* React
* Redux
* Babel
* Webpack
* Bootstrap v4-alpha.3


