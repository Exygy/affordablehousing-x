import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AmiChartService } from '../services/ami-chart.service';
import { AmiChart } from '../dtos/ami-charts/ami-chart-get.dto';
import { AmiChartCreate } from '../dtos/ami-charts/ami-chart-create.dto';
import { AmiChartUpdate } from '../dtos/ami-charts/ami-chart-update.dto';
import { defaultValidationPipeOptions } from '../utilities/default-validation-pipe-options';
import { AmiChartQueryParams } from '../dtos/ami-charts/ami-chart-query-params.dto';
import { IdDTO } from '../dtos/shared/id.dto';
import { SuccessDTO } from '../dtos/shared/success.dto';

@Controller('/amiCharts')
@ApiTags('amiCharts')
@UsePipes(new ValidationPipe(defaultValidationPipeOptions))
@ApiExtraModels(AmiChartCreate, AmiChartUpdate, IdDTO, AmiChartQueryParams)
export class AmiChartController {
  constructor(private readonly AmiChartService: AmiChartService) {}

  @Get()
  @ApiOperation({ summary: 'List amiCharts', operationId: 'list' })
  @ApiOkResponse({ type: AmiChart, isArray: true })
  async list(@Query() queryParams: AmiChartQueryParams) {
    return await this.AmiChartService.list(queryParams);
  }

  @Get(`:amiChartId`)
  @ApiOperation({ summary: 'Get amiChart by id', operationId: 'retrieve' })
  @ApiOkResponse({ type: AmiChart })
  async retrieve(@Param('amiChartId') amiChartId: string) {
    return this.AmiChartService.findOne(amiChartId);
  }

  @Post()
  @ApiOperation({ summary: 'Create amiChart', operationId: 'create' })
  @ApiOkResponse({ type: AmiChart })
  async create(@Body() amiChart: AmiChartCreate) {
    return await this.AmiChartService.create(amiChart);
  }

  @Put(`:amiChartId`)
  @ApiOperation({ summary: 'Update amiChart', operationId: 'update' })
  @ApiOkResponse({ type: AmiChart })
  async update(@Body() amiChart: AmiChartUpdate) {
    return await this.AmiChartService.update(amiChart);
  }

  @Delete()
  @ApiOperation({ summary: 'Delete amiChart by id', operationId: 'delete' })
  @ApiOkResponse({ type: SuccessDTO })
  async delete(@Body() dto: IdDTO) {
    return await this.AmiChartService.delete(dto.id);
  }
}
