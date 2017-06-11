import "plugins/network_vis/network_vis.less";
import 'plugins/network_vis/network_vis_controller';
import { TemplateVisTypeProvider } from 'ui/template_vis_type/template_vis_type';
import { VisSchemasProvider } from 'ui/vis/schemas';
import networkVisTemplate from 'plugins/network_vis/network_vis.html';
import networkVisParamsTemplate from 'plugins/network_vis/network_vis_params.html';
import { VisTypesRegistryProvider } from 'ui/registry/vis_types';
import image from './images/icon-network.svg';

// register the provider with the visTypes registry
VisTypesRegistryProvider.register(NetworkVisTypeProvider);

// define the TableVisType
function NetworkVisTypeProvider(Private) {
  const TemplateVisType = Private(TemplateVisTypeProvider);
  const Schemas = Private(VisSchemasProvider);
  // return the visType object, which kibana will use to display and configure new
  // Vis object of this type.
  return new TemplateVisType({
    name: 'network',
    title: 'Network',
    image,
    description: 'Displays a network node that link two fields that have been selected.',
    template: networkVisTemplate,
    params: {
      defaults: {
        showLabels: true,
        showPopup: false,
        showColorLegend: true,
        nodePhysics: true,
        firstNodeColor: '#FD7BC4',
        secondNodeColor: '#00d1ff',
        canvasBackgroundColor: '#FFFFFF',
        shapeFirstNode: 'dot',
        shapeSecondNode: 'box',
        displayArrow: false,
        posArrow: 'to',
        shapeArrow: 'arrow',
        smoothType: 'continuous',
        scaleArrow: 1,
        maxCutMetricSizeNode: 5000,
        maxCutMetricSizeEdge: 5000,
        minCutMetricSizeNode: 0,
        maxNodeSize: 80,
        minNodeSize: 8,
        maxEdgeSize: 20,
        minEdgeSize: 0.1,
        springConstant: 0.001,
        gravitationalConstant: -35000
      },
      editor: networkVisParamsTemplate
    },

    ////////MIRAR THIS
    hierarchicalData: function (vis) {
      return true;
    },
    ////////////////////

    schemas: new Schemas([
      {
        group: 'metrics',
        name: 'size_node',
        title: 'Node Size',
        max: 1
        /*
        defaults: [
          { type: 'count', schema: 'metric' }
        ]
        */
        //aggFilter: ['count', 'avg', 'sum', 'min', 'max', 'cardinality', 'std_dev']
      },
      {
        group: 'metrics',
        name: 'size_edge',
        title: 'Edge Size',
        max: 1,
      },
      {
        group: 'buckets',
        name: 'filter',
        title: 'Filter',
        mustBeFirst: 'true',
        max: 1,
        aggFilter: ['range', 'filters']
      },
      {
        group: 'buckets',
        name: 'first',
        icon: 'fa fa-circle-thin',
        //mustBeFirst: 'true',
        title: 'Node',
        min: 1,
        max: 2,
        aggFilter: ['terms', 'significant_terms']//Only have sense choose terms
      },
      {
        group: 'buckets',
        name: 'second',
        icon: 'fa fa-random',
        title: 'Relation',
        max: 1,
        aggFilter: ['terms', 'significant_terms']
      },
      {
        group: 'buckets',
        name: 'colornode',
        icon: 'fa fa-paint-brush',
        title: 'Node Color',
        max: 1,
        aggFilter: ['terms', 'significant_terms']
      }
    ])
  });
}

export default NetworkVisTypeProvider;
