/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { createToolingLog } from '@kbn/dev-utils';
import getopts from 'getopts';

import { execInProjects, filterProjectsByFlag, Project } from '../typescript';

export function runTslintCliOnTsConfigPaths(tsConfigPaths: string[]) {
  runTslintCli(tsConfigPaths.map(tsConfigPath => new Project(tsConfigPath)));
}

export function runTslintCli(projects?: Project[]) {
  const log = createToolingLog('info');
  log.pipe(process.stdout);

  const opts = getopts(process.argv.slice(2));
  projects = projects || filterProjectsByFlag(opts.project);

  if (!opts.format) {
    process.argv.push('--format', 'stylish');
  }

  const getProjectArgs = (project: Project) => [
    ...process.argv.slice(2),
    '--project',
    project.tsConfigPath,
  ];

  execInProjects(log, projects, 'tslint', getProjectArgs);
}
